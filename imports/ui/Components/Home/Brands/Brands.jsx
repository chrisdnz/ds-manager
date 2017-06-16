import React, {Component, PropTypes} from 'react';
import DropZone from './DropZone/DropZone.jsx';
import Imagerow from './ImageRow/Imagerow';
import { createContainer } from 'meteor/react-meteor-data';

class Brands extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="dropZone" className="animated fadeIn">
                <h1><i className="icojam_preview_thumbnails"></i>· Mis Anuncios ·<i className="icojam_preview_thumbnails"></i></h1>
                <DropZone />
                <Imagerow />
            </div>
        );
    }
}


export default createContainer(props=> {
    Meteor.subscribe("files.all");
    return {
        images: Images.find({}).fetch()
    }
}, Brands);