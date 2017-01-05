import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class DropZone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: []
        }
        this.onDrop = this.onDrop.bind(this);
    }
    onDrop (files) {
        this.setState({
          files: files
        });
      console.log('Received files: ', files);
      _.each(files, function(file) {
            file.owner = Meteor.userId(); //before upload also save the owner of that file
            Images.insert(file, function(err, fileObj) {
                if (err) {
                    console.log(err); //in case there is an error, log it to the console
                } else {
                    toastr.success("Archivo Subido", "Exito");
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
                <Dropzone
                    multiple={true}
                    accept="image/*"
                    onDrop={this.onDrop}>
                        <div>Arrastre y suelte las imagenes aqui para subir.</div>
                </Dropzone>
                {this.state.files.length > 0 ? <div>
                <h2>Subiendo {this.state.files.length} archivos...</h2>
                <div>{this.state.files.map((file) => <img height="84" width="84" key= {file.name} src={file.preview} /> )}</div>
                </div> : null}
            </div>
        );
    }
}

export default DropZone;
