import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        $(".formInput").removeClass('error animated wobble');
        let credentials = {
            user: this.refs.username.value,
            password: this.refs.password.value
        };
        Meteor.loginWithPassword(credentials.user, credentials.password, (err) => {
            if (!err) {
                FlowRouter.go('/home');
            } else {
                $(".loginError").removeClass('hinge hidden');
                $(".loginError").addClass('animated bounceInUp');
                $(".formInput").addClass('error animated wobble');
            }
        })
    }
    render() {
        return (
            <div>
                <div className="bgVideo animated slow fadeIn">
                    <div className="videoContainer">
                        <video autoPlay loop muted preload="auto">
                            <source id="topVideoSrc" src="http://fia.unitec.edu/www/media/unitec-media/Bienvenidos a Unitec.mp4" />
                            Su navegador no soporta video
                        </video>
                    </div>
                </div>
                <div className="loginForm animated bounceInDown delay1">
                    <form id="login-form" method="POST" onSubmit={this.handleSubmit}>
                        <div className="iconContainer">
                            <img src="/logos/logo-login.png" />
                            <h2>Ingreso Administrativo</h2>
                        </div>
                        <div className="formContainer">
                            <input type="text" className="formInput" name="username" ref="username" placeholder="Usuario" />
                            <input type="password" className="formInput" name="password" ref="password" placeholder="Contraseña" />
                            <button type="submit" className="button">Ingresar</button>
                            <span id="loginError" className="loginError hidden">Usuario/Contraseña incorrecta!</span>
                        </div>
                    </form>
                </div>
                <div className="footer">designed &amp; developed by: <a href="#">Najera&Sánchez</a></div>
            </div>
        );
    }
}

export default Login;
