import { Meteor } from 'meteor/meteor';
import '../imports/api/Ads';

Meteor.startup(() => {
    Meteor.methods({
        uploadFile:(fileInfo) => {
            /*Por seguridad podriamos implementar la subida
              del archivo en el server, es opcional
            */
        },
        deleteImage:(imageRef) => {
            if(Meteor.userId){
                Images.remove({_id: imageRef});
                Codigos.remove({Codigo: imageRef});
                return "ok";
            }else{
                throw new Meteor.Error("No-autorizado");
            }
        },
        timeoutAd:(timeout, id) => {
            if(Meteor.userId){
                Ad.update({_id: id}, {$set: {timeOut: timeout}});
                Codigos.update({}, {$set: {Time: timeout}}, {multi:true});
                return "Ok";
            }else{
                throw new Meteor.Error("No-autorizado");
            }
        },
        timeoutbyAd:(imageRef,timeout) => {
            if(Meteor.userId){
                Codigos.update({_id: imageRef._id}, {$set: {Time: timeout}});
                return "Ok";
            }else{
                throw new Meteor.Error("No-autorizado");
            }
        }
    })
});

var fs = Npm.require('fs');
var url = Npm.require("url");
var events = Npm.require("events");
var handler = new events.EventEmitter();
var mimeTypes = {
	".swf": "application/x-shockwave-flash",
	".flv": "video/x-flv",
	".f4v": "video/mp4",
	".f4p": "video/mp4",
	".mp4": "video/mp4",
	".asf": "video/x-ms-asf",
	".asr": "video/x-ms-asf",
	".asx": "video/x-ms-asf",
	".avi": "video/x-msvideo",
	".mpa": "video/mpeg",
	".mpe": "video/mpeg",
	".mpeg": "video/mpeg",
	".mpg": "video/mpeg",
	".mpv2": "video/mpeg",
	".mov": "video/quicktime",
	".movie": "video/x-sgi-movie",
	".mp2": "video/mpeg",
	".qt": "video/quicktime",
	".mp3": "audio/mpeg",
	".wav": "audio/x-wav",
	".aif": "audio/x-aiff",
	".aifc": "audio/x-aiff",
	".aiff": "audio/x-aiff",
	".jpe": "image/jpeg",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".png" : "image/png",
	".svg": "image/svg+xml",
	".tif": "image/tiff",
	".tiff": "image/tiff",
	".gif": "image/gif",
	".txt": "text/plain",
	".xml": "text/xml",
	".css": "text/css",
	".htm": "text/html",
	".html": "text/html",
	".pdf": "application/pdf",
	".doc": "application/msword",
	".vcf": "text/x-vcard",
	".vrml": "x-world/x-vrml",
	".zip": "application/zip",
	".webm": "video/webm",
	".m3u8": "application/x-mpegurl",
	".ts": "video/mp2t",
	".ogg": "video/ogg"
};
var settings = {
	"mode": "development",
	"forceDownload": false,
	"server": "beanStreamer",
	"maxAge": "3600"
};
var isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};
WebApp.connectHandlers.use(function(req, res, next) {
    var re = /^\/stream\/(.*)$/.exec(req.url);
    if (re !== null) {   // Only handle URLs that start with /uploads_url_prefix/*
        var filePath = process.env.PWD + '/.uploads/video/' + re[1];
		var stat;
		var ext;
		var info = {};
		var range = typeof req.headers.range === "string" ? req.headers.range : undefined;
		var reqUrl = url.parse(req.url, true);
		console.log("range: "+req.headers.range);

		ext = filePath.match(/.*(\..+?)$/);
		info.mime = mimeTypes[ext[1].toLowerCase()]
		console.log("extension: "+info.mime);

		try {
		  data = fs.readFileSync(filePath);
		} catch (e) {
			if (e.code === 'ENOENT') {
			  handler.emit("notFound", res, e);
			  return false;
			} else {
			  throw e;
			}
		}

		info.path = filePath;
		info.file = info.path.match(/(.*[\/|\\])?(.+?)$/)[2];

        // var data = fs.readFileSync(filePath);
        stat = fs.statSync(info.path);
        // console.log(stat);

        info.start = 0;
		info.end = stat.size - 1;
		info.size = stat.size;
		info.modified = stat.mtime;
		info.rangeRequest = false;

		if (range !== undefined && (range = range.match(/bytes=(.+)-(.+)?/)) !== null) {
			// Check range contains numbers and they fit in the file.
			// Make sure info.start & info.end are numbers (not strings) or stream.pipe errors out if start > 0.
			info.start = isNumber(range[1]) && range[1] >= 0 && range[1] < info.end ? range[1] - 0 : info.start;
			info.end = isNumber(range[2]) && range[2] > info.start && range[2] <= info.end ? range[2] - 0 : info.end;
			info.rangeRequest = true;
		} else if (reqUrl.query.start || reqUrl.query.end) {
			// This is a range request, but doesn't get range headers. So there.
			info.start = isNumber(reqUrl.query.start) && reqUrl.query.start >= 0 && reqUrl.query.start < info.end ? reqUrl.query.start - 0 : info.start;
			info.end = isNumber(reqUrl.query.end) && reqUrl.query.end > info.start && reqUrl.query.end <= info.end ? reqUrl.query.end - 0 : info.end;
		}

		info.length = info.end - info.start + 1;
		console.log("length: "+info.length);
		console.log("rangeRequest?: "+info.rangeRequest);
		console.log("serving file: "+filePath);

		downloadHeader(res, info);

		stream = fs.createReadStream(info.path, { flags: "r", start: info.start, end: info.end });
		stream.pipe(res);
		return true;

}else{
	next();
};
});

var downloadHeader = function (res, info) {
	var code = 200;
	var header;

	header = {
		"Cache-Control": "public; max-age=" + settings.maxAge,
		Connection: "keep-alive",
		"Content-Type": info.mime,
		"Content-Disposition": "inline; filename=" + info.file + ";",
		"Accept-Ranges": "bytes"
	};

	if (info.rangeRequest) {
		// Partial http response
		code = 206;
		header.Status = "206 Partial Content";
		header["Content-Range"] = "bytes " + info.start + "-" + info.end + "/" + info.size;
	}

	header.Pragma = "public";
	header["Last-Modified"] = info.modified.toUTCString();
	header["Content-Transfer-Encoding"] = "binary";
	header["Content-Length"] = info.length;
    if(settings.cors){
        header["Access-Control-Allow-Origin"] = "*";
        header["Access-Control-Allow-Headers"] = "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept";
    }
    header.Server = settings.server;
	header.Server = settings.server;

	res.writeHead(code, header);
};

var errorHeader = function (res, code) {
	var header = {
		"Content-Type": "text/html",
		Server: settings.server
	};

	res.writeHead(code, header);
};

handler.on("notFound", function (res, e) {
	errorHeader(res, 404);
	res.end("<!DOCTYPE html><html lang=\"en\">" +
		"<head><title>404 Not found</title>" +
		"<style>body{font-family:helvetica,sans-serif;color:#ffffff;background-color:#111111;text-align:center;}h1{font-weight:100;}"+
		"</style></head>"+
		"<body>" +
		"<h1>Sorry :(</h1>" +
		"<p>i can't file that file, please verify that url it's correct</p>" +
		"</body></html>");
	console.error("404 File not found - " + (e ? e.message : ""));
});
