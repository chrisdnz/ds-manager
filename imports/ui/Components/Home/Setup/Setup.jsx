import React, {Component} from 'react';
import './slider.js';

class Setup extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        $(".slider").PPredraw();
    }
    componentDidMount() {
        $(".slider").PPSlider({
            setValue: function(elem, value){
                console.log(`Prueba: ${value}`);
                val = value*1000;
                var data = {
                    key: elem.dataset.id+".timeOut",
                    value:val
                };
                console.dir(data);
            }
        });
        $('#optionsContainer').addClass('hidden');
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.visibility){
            $('#optionsContainer').removeClass('hidden');
            return true;
        }else{
            $('#optionsContainer').addClass('hidden');
            return false;
        }
    }
    render() {
        return (
            <div id="optionsContainer" className="animated fadeIn">
                <h1>Opciones</h1>
                <div className="column">
                    <span className="label">Tiempo por cada anuncio</span>
                    <div className="row">
                        <div><input className="slider" type="hidden" value="5" data-val="" data-id="general"/><span className="qty">5s.</span></div>
                    </div>
                    <br/>
                </div>
                <div className="column"></div>
            </div>
        );
    }
}

export default Setup;
