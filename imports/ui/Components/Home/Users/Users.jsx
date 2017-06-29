import React, {Component} from 'react';
import Alert from 'react-s-alert';
import UserList from './user_list/user_list';
import Modal from 'boron/DropModal';

var modalStyle = {
    color: '#000',
    padding: '10px'
};



let SELF;
class Users extends Component {
    constructor(props) {
        super(props);
        SELF = this;
        this.onAddClick = this.onAddClick.bind(this);
    }
    showModal(){
        SELF.refs.modal.show();
    }
    hideModal (){
        SELF.refs.modal.hide();
    }
    onAddClick (event) {
        event.preventDefault();
        let fullname = this.refs.inputUserName.value;
        let username = this.refs.inputUserNick.value;
        let password = this.refs.inputUserPassword.value;
        let confpassword = this.refs.inputUserPasswordConfirm.value;
        if (fullname == '') {
           Alert.error("Debe ingresar un nombre y apellido", {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
       }else if (username == '' ) {
           Alert.error("Debe ingresar un usuario", {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
       }else if (password == '') {
           Alert.error("Debe ingresar una contraseña", {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
       }else if (password != confpassword) {
           Alert.error("Contraseñas no coinciden", {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
       }else {
           let user = {username, fullname, password}
             Meteor.call('crearUsuario', user, (err, res)=> {
                  if(!err) {
                      Alert.success('Agregado!', {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
                      SELF.hideModal();
                  }else{
                      Alert.error(err.message, {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
                  }
              });   
       }
    }
    render() {
        return (
            <div className="animated fadeIn">
            <Modal ref="modal" modalStyle={modalStyle}>
                        <div className='row center-block'>
                            <div className="page-header">
                                <h2>Agregar Usuario</h2>
                            </div>
                        </div>
                        <div className='row center-block'>
                            <form className="form-horizontal " onSubmit={this.onAddClick}>
                                <div className="form-group">
                                    <label htmlFor="inputUserName">Nombre & Apellido</label>
                                    
                                    <input type="text" className="form-control" ref='inputUserName' id="inputUserName" placeholder="Oscar Sanchez"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputUserNick">Usuario</label>&nbsp;
                                    <input type="text" className="form-control" ref='inputUserNick' id="inputUserNick" placeholder="oscarsanchez"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputUserPassword">Contraseña</label>&nbsp;
                                    <input type="password" className="form-control" ref='inputUserPassword' id="inputUserPassword" placeholder="password"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputUserPasswordConfirm">Confirmar Contraseña</label>&nbsp;
                                    <input type="password" className="form-control" ref='inputUserPasswordConfirm' id="inputUserPasswordConfirm" placeholder="password"/>
                                </div>
                                <button type="submit" className="btn btn-success">Guardar</button>
                            </form>
                            
                        </div>
                        <hr/>
                        <div className='row p-l-xs'>
                            <button type="button" className="btn btn-danger pull-left" onClick={this.hideModal} >Cancelar</button>
                        </div>
                </Modal>
                <h1>Usuarios</h1>
                <div className='row'>
                    <div className='col-md-6 col-xs-offset-3'>
                        <button type="button" className="btn btn-success pull-right" onClick={this.showModal} >Agregar Usuario</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-xs-offset-3'>
                        <UserList/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;
