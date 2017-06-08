import React, {Component} from 'react';
import Alert from 'react-s-alert';

class Imageitem extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
    }
    handleDeleteImage(imageRef) {
        let componentRef = this;
        let confirmBox = new Confirmation({
            message: "Seguro que desea eliminar esta imagen?",
            title: "Confirmacion",
            cancelText: "Cancelar",
            okText: "Aceptar",
            success: true,
            focus: "cancel"
        }, function (ok) {
            if(ok){
              Meteor.call("deleteImage", componentRef.props.codigo.Codigo, (err, res)=> {
                  if(!err) {
                      Alert.success('Eliminada!', {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
                  }else{
                      console.log(err);
                  }
              });
            }
        });
    }
    render() {
        return (
            <li className="ad-background" onClick={this.handleDeleteImage}>
                <span className="adImage" style={{
                    backgroundImage: `url(http://localhost:3000/cfs/files/Images/${this.props.codigo.Codigo})`
                }}>
                </span>
                <i className="icojam_trash_1"></i>
                <small>Eliminar</small>
            </li>
        );
    }
}

export default Imageitem;
