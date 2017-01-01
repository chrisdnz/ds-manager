import React, {Component} from 'react';
import Loader from 'react-loader';

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
        $(window).bind('beforeunload', function(){
            return 'Su archivo no se ha guardado!'
        });
        this.setState({
            uploaded: false
        });
        for(var i = 0; i < files.length; i++) {
            Images.insert(files[i], function(err, image) {
                let cursor = Images.find({_id: image._id});
                let liveQuery = cursor.observe({
                    changed: function(newImage, oldImage){
                        if(newImage.isUploaded) {
                            liveQuery.stop();
                            console.log("Imagen subida");
                        }
                    }
                })
            })
        }

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

export default DropZone;