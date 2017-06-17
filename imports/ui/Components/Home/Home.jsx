import React, {Component} from 'react';
import NavBar from './NavBar/NavBar';
import SideBar from './SideBar/SideBar';
import Preview from './Preview/Preview';
import Brands from './Brands/Brands.jsx';
import Setup from './Setup/Setup.jsx';
import TVs from './TVs/TVs.jsx';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            promosView: false,
            configView: false,
            tvsView: false
        }
    }
    handleClick(params) {
        if(params.view === 'promos'){
            this.setState({
                promosView: true,
                configView: false,
                tvsView: false
            });
        }else if(params.view === 'config'){
            this.setState({
                promosView: false,
                configView: true,
                tvsView:false
            });
        }else if (params.view === 'tvs') {
            this.setState({
                promosView: false,
                configView: false,
                tvsView:true
            });
        }
    }
    render() {
        return (
            <div className="">
               hello baby
            </div>
        );
    }
}

export default Home;