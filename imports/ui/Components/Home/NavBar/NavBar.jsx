import React, {Component} from 'react';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout() {
        Meteor.logout((err)=> {
            if(!err) {
                FlowRouter.go('/');
            }
        })
    }
    render() {
        return (
            <div className="topBar">
                <img src="/logos/logo-blanco.png"/>
                <div className="title"><span>Admin Dashboard</span></div>
                <div className="rightOptions">
                <span data-tooltip ="Logout" onClick={this.handleLogout}><i id="logOut" className="icojam_cord_2"></i></span>
                </div>
            </div>
        );
    }
}

export default NavBar;