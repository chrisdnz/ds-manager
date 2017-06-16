import React, {Component} from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import NavBar from '../Components/Home/NavBar/NavBar';
import SideBar from '../Components/Home/SideBar/SideBar';
import Preview from '../Components/Home/Preview/Preview';

class Layout extends Component {
    render() {
        return (
            <main>
                <div className="outerContainer animated fadeIn">
                <div className="bg"></div>
                <NavBar />
                <SideBar />
                <div className="container">
                {this.props.content}
                </div>
            </div>
                <Alert stack={{limit: 3}} />
            </main>
        );
    }
}
export default Layout;