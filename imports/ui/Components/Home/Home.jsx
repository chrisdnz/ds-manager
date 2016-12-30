import React, {Component} from 'react';
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import Preview from './Preview/Preview';
import Brands from './Brands/Brands.jsx';
import Setup from './Setup/Setup.jsx';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            promosView: false,
            configView: false
        }
    }
    handleClick(params) {
        if(params.view === 'promos'){
            this.setState({
                promosView: true,
                configView: false
            });
        }else if(params.view === 'config'){
            this.setState({
                promosView: false,
                configView: true
            });
        }
    }
    render() {
        return (
            <div className="outerContainer animated fadeIn">
                <div className="bg"></div>
                <NavBar />
                <SideBar handleClick={this.handleClick.bind(this)}/>
                <div className="container">
                    <Brands visibility={this.state.promosView}/>
                </div>
                <div className="container">
                    <Setup visibility={this.state.configView}/>
                </div>
                <Preview />
            </div>
        );
    }
}

export default Home;