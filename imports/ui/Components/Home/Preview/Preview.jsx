import React, {Component} from 'react';

class Preview extends Component {
    render() {
        return (
            <div className="menuFrame">
                {<iframe src="http://unitecanuncios.herokuapp.com/cliente/preview" id='previewIframe' className="iframe"></iframe>}
                <span className="bezel"></span>
            </div>
        );
    }
}

export default Preview;
