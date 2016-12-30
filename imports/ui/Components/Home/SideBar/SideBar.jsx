import React, {Component} from 'react';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.onPromoClick = this.onPromoClick.bind(this);
        this.onConfigClick = this.onConfigClick.bind(this);
    }
    onPromoClick() {
        this.props.handleClick.call(null, {
            view: 'promos'
        });
    }
    onConfigClick() {
        this.props.handleClick.call(null, {
            view: 'config'
        })
    }
    render() {
        return (
            <div className="sideBar">
                <span className="subTitle">Menu Editor</span>
                <div className="sideMenu topPadding">
                    <ul>
                        <li id="promos" onClick={this.onPromoClick}><i className="icojam_calendar_5"></i> Asignar</li>
                        <li id="options" onClick={this.onConfigClick}><i className="icojam_options2"></i> Configurar</li>
                    </ul>
                </div>
                <div className="about">Developed by: <a href="#">Najera & Sanchez</a></div>
            </div>
        );
    }
}

export default SideBar;