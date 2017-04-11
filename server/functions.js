Meteor.startup(function () {
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/',
    overwrite: true,
    checkCreateDirectories: true,
    cacheTime: 100,
	mimeTypes: {
	    "jpeg": "image/jpeg",
	    "jpg": "image/jpeg",
	    "png": "image/png",
	    "gif": "image/gif",
	    "mp4": "video/mp4"
	}
	// ,finished:function(fileInfo){
	// 	function fixedEncodeURIComponent (str) {
	// 	  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
	// 	    return '%' + c.charCodeAt(0).toString(16);
	// 	  });
	// 	}
	// 	var options = Options.findOne({"_id":"01"});
	// 	Options.update({"_id": "01"}, {$push: {"ads.pictureUrls": options.general.adminUrl+"/upload/"+fixedEncodeURIComponent(fileInfo.name)}});
	// 	console.log('File uploaded: '+fixedEncodeURIComponent(fileInfo.name));
	// }
	,getDirectory: function(fileInfo, formData) {
      if (formData && formData.directoryName != null) {
        return formData.directoryName;
      }
      return "";
    }
	,finished: function(fileInfo, formData) {
		function fixedEncodeURIComponent (str) {
		  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
		    return '%' + c.charCodeAt(0).toString(16);
		  });
		}
		console.log(formData.type);
		if (formData.type == 'ad') {
			if (fileInfo.type == 'image/jpeg' || fileInfo.type == 'image/png') {
				console.log("uploaded file it's an ad");
				var options = Options.findOne({"_id":"01"});
				Options.update({"_id": "01"}, {$push: {"ads.pictureUrls": options.general.adminUrl+"/upload/"+fixedEncodeURIComponent(fileInfo.name)}});
				console.log('Ad uploaded: '+fixedEncodeURIComponent(fileInfo.name));
			}
		}
		if (formData.type == 'videoTop') {
			console.log("uploaded file it's a video");
			var options = Options.findOne({"_id":"01"});
			Options.update({"_id": "01"}, {$set: {"Videos.top": options.general.adminUrl+"/stream/"+fixedEncodeURIComponent(fileInfo.name)}});
			console.log('Top video uploaded: '+fixedEncodeURIComponent(fileInfo.name));
		}
		if (formData.type == 'videoBottom') {
			console.log("uploaded file it's a video");
			var options = Options.findOne({"_id":"01"});
			Options.update({"_id": "01"}, {$set: {"Videos.bottom": options.general.adminUrl+"/stream/"+fixedEncodeURIComponent(fileInfo.name)}});
			console.log('Bottom video uploaded: '+fixedEncodeURIComponent(fileInfo.name));
		}
    }
  })
});
