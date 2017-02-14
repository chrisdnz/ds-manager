import React, {Component} from 'react';

class Preview extends Component {
    render() {
        return (
            <div className="menuFrame">
                {<iframe src="https://unitec-anuncios-cliente.herokuapp.com/" className="iframe"></iframe>}
                <span className="bezel"></span>
            </div>
        );
    }
}

export default Preview;
