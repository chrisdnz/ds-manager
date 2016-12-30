import React, {Component} from 'react';

class DropZone extends Component {
    render() {
        return (
            <form method="POST" encType="multipart/form-data">
                <input type="file" className="jqUploadclass" multiple="true"/>
                <div className="jqDropZone">Arrastrar elementos para subir archivos</div>
            </form>
        );
    }
}

export default DropZone;