import React, {Component} from 'react';

class SideBar extends Component {
    constructor(props) {
        super(props);
        
    }
    onPromoClick() {
       FlowRouter.go(`/brands`);
    }
    onConfigClick() {
       FlowRouter.go(`/config`);
    }
    onTVsClick() {
        FlowRouter.go(`/tvs`);
    }
    render() {
        return (
            <div className="sideBar">
                <span className="subTitle">Menu Editor</span>
                <div className="sideMenu topPadding">
                    <ul>
                        <li id="options" onClick={this.onConfigClick}><i className="icojam_player_1"></i> Contenido</li>
                        <li id="tvs" onClick={this.onTVsClick}><i className="icojam_tv_wide"></i> Televisores</li>
                    </ul>
                </div>
                <div className="about">Developed by: <a href="#">Najera & Sanchez</a></div>
            </div>
        );
    }
}

export default SideBar;