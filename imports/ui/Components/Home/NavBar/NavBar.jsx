import React, {Component} from 'react';
import Alert from 'react-s-alert';
import Modal from 'boron/DropModal';

var modalStyle = {
    color: '#000',
    padding: '10px'
};

let SELF;

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.changePassword = this.changePassword.bind(this);
        SELF = this;
    }
    handleLogout() {
        Meteor.logout((err)=> {
            if(!err) {
                FlowRouter.go('/');
            }
        })
    }
    showModal(){
        SELF.refs.modal.show();
    }
    hideModal (){
        SELF.refs.modal.hide();
    }
    changePassword(event) {
        event.preventDefault();
        let oldPassword = SELF.refs.inputOldPassword.value;
        let newPassword = SELF.refs.inputNewPassword.value;
        let confirmPassword = SELF.refs.inputConfirmPassword.value;
        if (oldPassword == '') {
            Alert.error("Debe ingresar la contraseña anterior", {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 2500
            });
        } else if (newPassword == '') {
            Alert.error("Debe ingresar una contraseña", {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 2500
            });
        } else if (newPassword != confirmPassword) {
            Alert.error("Contraseñas no coinciden", {
                position: 'bottom-right',
                effect: 'slide',
                timeout: 2500
            });
        }else {
            Accounts.changePassword(oldPassword, newPassword, (err)=> {
                if (err) {
                    Alert.error(err.message, {
                        position: 'bottom-right',
                        effect: 'slide',
                        timeout: 2500
                    });
                } else {
                    Alert.success('Cambiada Con Exito!', {
                        position: 'bottom-right',
                        effect: 'slide',
                        timeout: 2500
                    });
                    SELF.hideModal();
                }
            })
        }
    //    Meteor.call("cambiarPass", oldPassword, newPassword, (err, res)=> {
    //         if(!err) {
    //                   Alert.success('Cambiada Con Exito!', {
    //                       position: 'bottom-right',
    //                       effect: 'slide',
    //                       timeout: 2500
    //                   });
    //                   SELF.hideModal();
    //               }else{
    //                   Alert.error(err.message, {
    //                       position: 'bottom-right',
    //                       effect: 'slide',
    //                       timeout: 2500
    //                   });
    //               }
    //     })
    }
    render() {
        return (
            <div className="topBar">
                <Modal ref="modal" modalStyle={modalStyle}>
                        <div className='row center-block'>
                            <div className="page-header">
                                <h2>Cambiar Contraseña</h2>
                            </div>
                        </div>
                        <div className='row center-block'>
                            <form className="form-horizontal " onSubmit={SELF.changePassword}>
                                <div className="form-group">
                                    <label htmlFor="inputOldPassword">Contraseña Anterior</label>
                                    <input type="password" className="form-control" ref='inputOldPassword' id="inputOldPassword" placeholder="oldPassword"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputNewPassword">Nueva Contraseña</label>&nbsp;
                                    <input type="password" className="form-control" ref='inputNewPassword' id="inputNewPassword" placeholder="newPassword"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputConfirmPassword">Confirmar Contraseña</label>&nbsp;
                                    <input type="password" className="form-control" ref='inputConfirmPassword' id="inputConfirmPassword" placeholder="newPassword"/>
                                </div>
                                <button type="submit" className="btn btn-success">Cambiar</button>
                            </form>
                            
                        </div>
                        <hr/>
                        <div className='row p-l-xs'>
                            <button type="button" className="btn btn-danger pull-left" onClick={this.hideModal} >Cancelar</button>
                        </div>
                </Modal>
                <img src="/logos/logo-blanco.png"/>
                <div className="title"><span>Admin Dashboard</span></div>
                <div className="rightOptions">
                <span data-tooltip ="Change Pass" onClick={this.showModal}><i id="changePassword" className="icojam_lock"></i></span>
                <span data-tooltip ="Logout" onClick={this.handleLogout}><i id="logOut" className="icojam_cord_2"></i></span>
                </div>
            </div>
        );
    }
}

export default NavBar;