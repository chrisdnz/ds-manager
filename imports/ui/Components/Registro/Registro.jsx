import React, {Component} from 'react';
import Alert from 'react-s-alert';

class Registro extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        let user = {
            username: this.refs.username.value,
            fullname: this.refs.name.value,
            password: this.refs.password.value
        };
        Accounts.createUser({
            email: user.username,
            password: user.password,
            profile: {
                fullname: user.fullname,
                role: 'administrador'
            }
        }, (err)=> {
            if(err) {
                Alert.error('El usuario que ingreso ya existe!', {
                    position: 'bottom-right',
                    effect: 'slide',
                    timeout: 2500
                });
            }else{
                FlowRouter.go('/home');
                Alert.success('Bienvenido!', {
                    position: 'bottom-right',
                    effect: 'slide',
                    timeout: 2500
                });
            }
        })
    }
    render() {
        return (
            <form method="POST" onSubmit={this.handleSubmit} id="signup-form" className={this.props.visibility}>
                <img src="/logos/logo-login.png"/>
                <h2>Registrarse</h2>
                <div className="formContainer">
                    <input type="text" name="name" placeholder="Nombre Completo" ref="name" className="formInput"/>
                    <input type="text" name="username" placeholder="Usuario" ref="username" className="formInput"/>
                    <input type="password" name="password" placeholder="Contraseña" ref="password" className="formInput"/>
                    <button type="submit" className="button">Registrar</button>
                </div>
            </form>
        );
    }
}

export default Registro;
