import React, {Component} from 'react';
import Loader from 'react-loader';
import { createContainer } from 'meteor/react-meteor-data';

class DropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaded: true
        }
        this.handleUpload = this.handleUpload.bind(this);
    }
    componentDidMount() {
        var componentRef = this;
        $('#dnd').on('dragover', function(event) {
            event.preventDefault();
            event.stopPropagation();
            let dropZone = $('.jqDropZone'), foundDropZone;
            let found = false, node = event.target;
            do {
                if($(node).hasClass('jqDropZone')) {
                    found = true;
                    foundDropZone = $(node);
                    break;
                }
                node = node.parentNode;
            } while (node != null);
            dropZone.removeClass('in hover');
            if(found) {
                foundDropZone.addClass('hover');
            }
        });
        $('#dnd').on('dragenter', function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $('#dnd').on('dragleave', function(event) {
            event.preventDefault();
            event.stopPropagation();
            $('#dnd').removeClass("hover");
        });
        $('#dnd').on('drop', function(event) {
            if(event.originalEvent.dataTransfer){
                if(event.originalEvent.dataTransfer.files.length) {
                    event.preventDefault();
                    event.stopPropagation();
                    componentRef.handleUpload(event.originalEvent.dataTransfer.files);
                }
            }
        });
    }
    handleUpload(files) {
        // $(window).bind('beforeunload', function(){
        //     return 'Su archivo no se ha guardado!'
        // });
        this.setState({
            uploaded: false
        });
        let componentRef = this;
        for(var i = 0; i < files.length; i++) {
            Images.insert(files.item(i), function(err, image){
                var cursor = Images.find({_id: image._id});
                var liveQuery = cursor.observe({
                    changed: function(newDoc, oldDoc) {
                        if(newDoc.isUploaded){
                            liveQuery.stop();
                            componentRef.setState({
                                uploaded: true
                            });
                        }
                    }
                })
                var intervalHandle = Meteor.setInterval(function () {
                    console.log("Inside interval");
                    if (image.hasStored("container")) {
                        // File has been uploaded and stored. Can safely display it on the page.
                        // var uploadedImage = {
                        //     "profile.image.url": "/cfs/files/profileImages/" + fileObj._id
                        // };
                        // Meteor.users.update(userId, {$set: uploadedImage});
                        //
                        // Session.set('profilePhotoUploaded', true);
                        console.log(image._id);
                        Codigos.insert({Codigo: image._id});
                        // file has stored, close out interval
                        Meteor.clearInterval(intervalHandle);
                    }
                }, 1000);
            });

        }
        $('#dnd').removeClass("hover");
    }
    render() {
        let options = {
            lines: 13,
            color: '#fff',
            rotate: 0,
            direction: 1,
            speed: 1,
            top: '50%',
            left: '50%',
            position: 'absolute'
        }
        return (
            <div id="dnd" className="jqDropZone fade">
                <Loader loaded={this.state.uploaded} options={options}>
                    Arrastre aqui y deje caer el archivo
                </Loader>
            </div>
        );
    }
}

export default createContainer(props=>{
    Meteor.subscribe("files.all");
    return {
        images: Images.find({}).fetch(),
        codigos: Codigos.find({}).fetch()
    }
}, DropZone);
