import React, {Component, PropTypes} from 'react';
import DropZone from './DropZone/DropZone.jsx';

class Brands extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $('#dropZone').hide();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.visibility){
            $('#dropZone').show(100);
            return true;
        }else{
            $('#dropZone').hide(100);
            return false;
        }
    }
    render() {
        return (
            <div id="dropZone" className="animated fadeIn">
                <h1><i className="icojam_preview_thumbnails"></i>· Mis Anuncios ·<i className="icojam_preview_thumbnails"></i></h1>
                <DropZone />
            </div>
        );
    }
}
Brands.defaultProps = {
    visibility: false
}

export default Brands;