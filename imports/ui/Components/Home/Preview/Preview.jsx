import React, {Component} from 'react';

class Preview extends Component {
    render() {
        return (
            <div className="menuFrame">
                {<iframe src="http://fia.unitec.edu/cliente/preview" className="iframe"></iframe>}
                <span className="bezel"></span>
            </div>
        );
    }
}

export default Preview;
