import React, {Component} from 'react';
import Modal from 'boron/DropModal';
import Alert from 'react-s-alert';
import { createContainer } from 'meteor/react-meteor-data';


var modalStyle = {
    color: '#000',
    padding: '10px'
};

let SELF;
class TVList extends Component {
     constructor(props) {
    super(props);
    SELF = this;
    this.state={Name:'',_id:''}
    this.handleGo = this.handleGo.bind(this);
  }
    handleGo(event, Name) {
        event.preventDefault();
        FlowRouter.go(`/home/${Name}`);
    }
    handlePreview(event, Name) {
        event.preventDefault();
        FlowRouter.go(`/cliente/${Name}`);
    }
    handleEdit(event) {
        event.preventDefault();
        let oldName = SELF.state.Name;
        let newName = SELF.refs.inputTVName.value
        if (newName == '') {
            Alert.error("Debe ingresar un nombre", {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
        } else {
            Meteor.call('editTV', oldName, newName, (err, res)=> {
                  if(!err) {
                      Alert.success('Editado con exito!', {
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
    handleRemove(event, Name) {
        event.preventDefault();
        new Confirmation({
        message: "Seguro desea eliminar ?",
        title: "Confirmacion",
        cancelText: "Cancelar",
        okText: "Eliminar",
        success: false, // whether the button should be green or red
        focus: "cancel" // which button to autofocus, "cancel" (default) or "ok", or "none"
      }, function (ok) {
        if (ok) {
           Meteor.call('deleteTV', Name, (err, res)=> {
                  if(!err) {
                      Alert.success('Eliminado con exito!', {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
                  }else{
                      Alert.error(err.message, {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
                  }
              });   
        }else {
          Alert.info("Eliminar Cancelado", {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
        }

      });
    }
    showModal(Name, _id){
        SELF.setState({Name,_id})
        SELF.refs.modal.show();
    }
    hideModal (){
        SELF.refs.modal.hide();
        SELF.setState({Name:"",_id:""})
    }
    render() {
        const { buttonStyles } = styles;
        return (
             this.props.tvs.length > 0 ? 
                <ul className="list-group">
                    <Modal ref="modal" modalStyle={modalStyle}>
                        <div className='row center-block'>
                            <div className="page-header">
                                <h2>Modificar {this.state.Name}</h2>
                            </div>
                        </div>
                        <div className='row center-block'>
                            <form className="form-inline " onSubmit={this.handleEdit}>
                                <div className="form-group">
                                    <label htmlFor="inputTVName">Name</label>&nbsp;
                                    <input type="text" className="form-control" defaultValue={this.state.Name}  ref='inputTVName' id="inputTVName" placeholder="UNITEC-TGU-Registro"/>
                                </div>
                                
                                <button type="submit" className="btn btn-success">Guardar</button>
                            </form>
                            
                        </div>
                        <hr/>
                        <div className='row p-l-xs'>
                        &nbsp;
                            <button type="button" className="btn btn-danger pull-left" onClick={this.hideModal} >Cancelar</button>
                        </div>
                </Modal>
                   {this.props.tvs.map(({ _id, Name }) =>  (
                        <li className="list-group-item" style={{color: '#444'}} key={_id}>
                            {Name}
                            <span className="btn-group-xs pull-right">
                                <button title="Eliminar" onClick={() => this.handleRemove(event,Name)} type="button" style={buttonStyles} className="btn btn-default"> <span className="glyphicon glyphicon-remove"></span></button>
                                <button title="Cambiar Nombre" onClick={() => this.showModal(Name,_id)} type="button" style={buttonStyles} className="btn btn-default"> <span className="glyphicon glyphicon-pencil"></span></button>
                                <button title="Vista Previa" onClick={() => this.handlePreview(event,Name)} type="button" style={buttonStyles} className="btn btn-default"> <span className="glyphicon glyphicon-eye-open"></span></button>
                                <button title="Contenido" onClick={() => this.handleGo(event,Name)} type="button" style={buttonStyles} className="btn btn-default"> <span className="glyphicon glyphicon-tasks"></span></button>
                            </span>
                        </li>
                    ))}
                </ul> 
                : <div className="alert alert-danger" role="alert">No TVs yet.</div>
        );
    }
}

const styles = {
    buttonStyles: {
        border: 0
    }
};

export default createContainer(props => {
    let data = Meteor.subscribe("TVs");
    return {
        tvs: TVs.find({}).fetch(),
        ready: data.ready()
    }
}, TVList)
