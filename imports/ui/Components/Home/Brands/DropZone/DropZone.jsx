import React, {Component} from 'react';
import Dropzone from 'react-dropzone';

class DropZone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            files: []
        }
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(files) {
        // $(window).bind('beforeunload', function(){
        //     return 'Su archivo no se ha guardado!'
        // });

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
            });

        }


    }

    render() {
        return (
            <div id="dnd">
                <Dropzone
                    ref="dropzone"
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
