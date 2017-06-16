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
                        <li id="promos" onClick={this.onPromoClick}><i className="icojam_calendar_5"></i> Asignar</li>
                        <li id="options" onClick={this.onConfigClick}><i className="icojam_options2"></i> Configurar</li>
                        <li id="tvs" onClick={this.onTVsClick}><i className="icojam_tv_wide"></i> Televisores</li>
                    </ul>
                </div>
                <div className="about">Developed by: <a href="#">Najera & Sanchez</a></div>
            </div>
        );
    }
}

export default SideBar;