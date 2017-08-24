import React, { Component } from 'react';
import Alert from 'react-s-alert';
var Halogen = require('halogen');
class Imageitem extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteImage = this.handleDeleteImage.bind(this);
        this.handleLoadingImage = this.handleLoadingImage.bind(this);
        this.state = { loading: true, setClass: 'adImage hidden' }
    }
    handleLoadingImage() {
        this.setState({ loading: false, setClass: 'adImage' })
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
            if (ok) {
                if (componentRef.props.tvname) {
                    Meteor.call("deleteImageTV", componentRef.props.imagecode, componentRef.props.tvname, (err, res) => {
                        if (!err) {
                            Alert.success('Eliminada!', {
                                position: 'bottom-right',
                                effect: 'slide',
                                timeout: 2500
                            });
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    Meteor.call("deleteImage", componentRef.props.imagecode, (err, res) => {
                        if (!err) {
                            Alert.success('Eliminada!', {
                                position: 'bottom-right',
                                effect: 'slide',
                                timeout: 2500
                            });
                        } else {
                            console.log(err);
                        }
                    });
                }

            }
        });
    }
    render() {
        var color = '#fff';

        var style = {
            display: '-webkit-flex',
            display: 'flex',
            WebkitFlex: '0 1 auto',
            flex: '0 1 auto',
            WebkitFlexDirection: 'column',
            flexDirection: 'column',
            WebkitFlexGrow: 1,
            flexGrow: 1,
            WebkitFlexShrink: 0,
            flexShrink: 0,
            WebkitFlexBasis: '100%',
            flexBasis: '100%',
            maxWidth: '100%',
            height: '150px',
            WebkitAlignItems: 'center',
            alignItems: 'center',
            WebkitJustifyContent: 'center',
            justifyContent: 'center'
        };
        let { loading, setClass } = this.state;
        return (
            <li className="ad-background" onClick={this.handleDeleteImage}>
                {
                    this.props.mediaFormat.split('/')[0] === 'image' ? (
                        <img onLoad={this.handleLoadingImage} className={setClass} src={`http://localhost:3000/cfs/files/Images/${this.props.imagecode}?store=thumbs`} />
                    ) : (
                        <video id="myVideo" onLoadStart={this.handleLoadingImage} className={setClass}>
                            <source src={`http://localhost:3000/cfs/files/Images/${this.props.imagecode}?store=container#t=5,10`} type={this.props.mediaFormat}/>
                        </video>
                    )
                }
                {loading ? <div className='adImage' style={style}><Halogen.MoonLoader color={color} /></div> :
                    <div><i className="icojam_trash_1"></i>
                        <small>Eliminar</small></div>}
            </li>
        );
    }
}

export default Imageitem;
