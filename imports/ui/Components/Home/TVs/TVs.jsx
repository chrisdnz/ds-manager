import React, {Component} from 'react';
import Alert from 'react-s-alert';
import TVList from './tv_list/tv_list';
import Modal from 'boron/DropModal';

var modalStyle = {
    color: '#000',
    padding: '10px'
};



let SELF;
class TVs extends Component {
    constructor(props) {
        super(props);
        SELF = this;
    }
    showModal(){
        SELF.refs.modal.show();
    }
    hideModal (){
        SELF.refs.modal.hide();
    }
    onAddClick (event) {
        event.preventDefault();
        if (SELF.refs.inputTVName.value=='') {
            Alert.error("Debe ingresar un nombre", {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
        } else {
            Meteor.call('insertTV', SELF.refs.inputTVName.value, (err, res)=> {
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
                                <h2>Agregar TV</h2>
                            </div>
                        </div>
                        <div className='row center-block'>
                            <form className="form-inline " onSubmit={this.onAddClick}>
                                <div className="form-group">
                                    <label htmlFor="inputTVName">Name</label>&nbsp;
                                    <input type="text" className="form-control" ref='inputTVName' id="inputTVName" placeholder="UNITEC-TGU-Registro"/>
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
                <h1>TV's</h1>
                <div className='row'>
                    <div className='col-md-6 col-xs-offset-3'>
                        <button type="button" className="btn btn-success pull-right" onClick={this.showModal} >Agregar TV</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 col-xs-offset-3'>
                        <TVList />
                    </div>   
                </div>
            </div>
        );
    }
}

export default TVs;
