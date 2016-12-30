import React, {Component} from 'react';

class Setup extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        $('#optionsContainer').hide();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.visibility){
            $('#optionsContainer').show(100);
            return true;
        }else{
            $('#optionsContainer').hide(100);
            return false;
        }
    }
    render() {
        return (
            <div id="optionsContainer" className="animated fadeIn">
                <h1>Opciones</h1>
                <div className="column">
                    <span className="label">Menú</span>
                    <div className="row">
                        <div><input type="hidden" className="slider"/><span className="qty">5s.</span></div>
                    </div><br/>
                    <span className="label">Promocionales</span>
                    <div className="row">
                        <div><input type="hidden" className="slider"/><span className="qty">3s.</span></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Setup;