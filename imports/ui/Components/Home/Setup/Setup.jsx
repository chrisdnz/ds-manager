import React, {Component} from 'react';
import './slider.js';
import Alert from 'react-s-alert';
import '../../../../api/Ads';
import { createContainer } from 'meteor/react-meteor-data';

class Setup extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        $(".slider").PPredraw();
    }
    componentDidMount() {
        let componentRef = this;
        $(".slider").PPSlider({
            setValue: function(elem, value){
                console.log(`Prueba: ${value}`);
                val = value*1000;
                var data = {
                    key: elem.dataset.id+".timeOut",
                    value:val
                };
                console.dir(data);
                Meteor.call("timeoutAd", val, componentRef.props.ads[0]._id, (err, res)=> {
                    if(!err){
                      Alert.info(`Timer actualizado a ${value} segundos`, {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 3000
                      });
                    }else{
                      Alert.error('No se pudo actualizar su timer', {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
                    }
                })
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
                        <div><input
                            className="slider"
                            type="hidden"
                            value={this.props.ads.length > 0 && (this.props.ads[0].timeOut/1000)}
                            data-val=""
                            data-id="general"/>
                          <span className="qty">{this.props.ads.length > 0 && (this.props.ads[0].timeOut/1000)}s.</span>
                        </div>
                    </div>
                    <br/>
                </div>
                <div className="column"></div>
            </div>
        );
    }
}

export default createContainer(props => {
    Meteor.subscribe("ads");
    return {
        ads: Ad.find({}).fetch()
    }
}, Setup);
