import React, {Component} from 'react';
import Alert from 'react-s-alert';
import { createContainer } from 'meteor/react-meteor-data';





class UserList extends Component {
     constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }
    handleRemove(event, _id) {
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
          Meteor.call('borrarUsuario', _id, (error) => {
            if (error) {
              Alert.error(error.message, {
                          position: 'bottom-right',
                          effect: 'slide',
                          timeout: 2500
                      });
            }else {
              Alert.success('Usuario Eliminado con Exito!', {
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
    render() {
        return (
             this.props.users.length > 0 ? 
                <ul className="list-group">
                    {this.props.users.map(({_id, profile}) =>  (
                        <li className="list-group-item list-group-item-info" key={_id}>
                            { Meteor.userId() == _id ? <span className="label label-success">You!</span>:"" }
                            &nbsp;
                            {profile.fullname}
                            {
                                Meteor.userId() == _id ? 
                                    "" 
                                : 
                                    <span className="btn-group-xs pull-right" role="group">
                                      <button  onClick={() => this.handleRemove(event,_id)} type="button" className="btn btn-danger"> <span className="glyphicon glyphicon-remove"  aria-hidden="true"></span></button>
                                    </span> }
                        </li>
                    ))}
                </ul>
                 : <div className="alert alert-danger" role="alert">No TVs yet.</div>
        );
    }
}

export default createContainer(props => {
      let data1 = Meteor.subscribe('users');
      return {
        users: Meteor.users.find({}).fetch(),
      }
}, UserList)
