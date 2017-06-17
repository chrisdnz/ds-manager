import React, {Component} from 'react';
import './slider.js';
import Alert from 'react-s-alert';
import '../../../../api/Ads';
import ImageList from './image_list/image_list';
import DropZone from '../Brands/DropZone/DropZone';
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
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.visibility){
            
            return true;
        }else{
            
            return false;
        }
    }
    render() {
        return (
            <div id="optionsContainer" className="animated fadeIn">
                <h1>Contenido Global</h1>
                <div className="row setupSlider hidden">
                    <span className="label">Tiempo predeterminado</span>
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
                </div>
                <div className='row setupMedia'>
                <DropZone/>
                <ImageList />
                </div>
            </div>
        );
    }
}

export default createContainer(props => {
    Meteor.subscribe("ads");
    return {
        ads: Ad.find({}).fetch(),
        images: Images.find({}).fetch(),
        codigos: Codigos.find({}).fetch()
    }
}, Setup);
