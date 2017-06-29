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
        let componentRef = this;
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
        for(let i = 0; i < files.length; i++) {
            
            Images.insert(files.item(i), function(err, image){
                
                let cursor = Images.find({_id: image._id});
                let liveQuery = cursor.observe({
                    changed: function(newDoc, oldDoc) {
                        if(newDoc.isUploaded){
                            liveQuery.stop();
                            componentRef.setState({
                                uploaded: true
                            });
                        }
                    }
                })
                let intervalHandle = Meteor.setInterval(function () {
                    if (image.hasStored("container")) {
                        Meteor.call("incrementarContador",  (err, res)=> {
                            if(!err) {
                                    let Codigo = image._id;
                                    let Time = 3000;
                                    let Order = res;
                                    Meteor.call("insertCodigo", Codigo, Time, Order, (err, res)=> { })
                                    
                                    Meteor.clearInterval(intervalHandle);
                            }else{
                                console.log(err);
                            }
                        });
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
    Meteor.subscribe("codigos");
    return {
        images: Images.find({}).fetch(),
        codigos: Codigos.find({}).fetch()
    }
}, DropZone);
