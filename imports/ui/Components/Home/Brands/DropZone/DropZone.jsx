import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class DropZone extends Component {
    constructor(props) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(files) {
        _.each(files, function(file) {
            file.owner = Meteor.userId(); //before upload also save the owner of that file
            Images.insert(file, function(err, fileObj) {
                if (err) {
                    console.log(err); //in case there is an error, log it to the console
                    toastr.error(err, "Error");
                } else {
                    console.log("imagen subida");
                    toastr.success(fileObj._id, "Exito. Imagen Subida");
                    //the image upload is done successfully.
                    //you can use this callback to add the id of your file into another collection
                    //for this you can use fileObj._id to get the id of the file
                }
            });
        });

    }
    render() {
        return (
            <div id="dnd">
                <Dropzone onDrop={this.handleUpload}>
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
            </div>
        );
    }
}

export default DropZone;
