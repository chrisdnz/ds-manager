import React, {
    Component
} from 'react';
import Alert from 'react-s-alert';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Sortable from 'react-sortablejs';
import {
    createContainer
} from 'meteor/react-meteor-data';
import ImageDetail from '../../Setup/image_detail/image_detail';
import SliderTest from '../../Setup/image_detail/SliderTest/SliderTest';
let SELF;


const updateMediaOrder = (items) => {
    items.forEach((Codigo, order) => {
        Meteor.call("updateOrder", Codigo, order, (err, res) => {
            if (!err) {

            } else {
                console.log(err);
            }
        });
    });

};
const updateMediaOrder2 = (items) => {
     var tvname = FlowRouter.getParam("tvName");
    items.forEach((imagecode, order) => {
        Meteor.call("updateTVOrder", tvname, imagecode, order, (err, res) => {
            if (!err) {

            } else {
                console.log(err);
            }
        });
    });
};

class TVView extends Component {
    constructor(props) {
        super(props);
        SELF = this;
    }


    render() {

        return ( 
            <div className = "animated fadeIn" >
                <h1 > TV 's</h1> 
                <div className = "row" >
                    <div className = "col-sm-6" >
                        <h2> Global </h2> 
                        {this.props.codigos.length > 0 ? 
                            <Sortable
                                className = "image-list"
                                onChange = {updateMediaOrder } 
                                options={{
                                    animation: 150,
                                    group: {
                                        name: 'shared',
                                        pull: 'clone',
                                        put: false,
                                        revertClone: true
                                    }
                                }}
                            >
                                {
                                 this.props.codigos.map(codigo =>
                                    <ImageDetail imagecode={codigo.Codigo} tiempo={ codigo.Time } key={codigo._id}/>
                                )
                                } </Sortable> : <div className="alert alert-danger" role="alert">No media yet.</div>
                        } 
                    </div> 
                       <div className = "col-sm-6" >
                        <h2> Televisor {FlowRouter.getParam("tvName")} </h2> 
                        {this.props.codigos.length > 0 ? 
                            <Sortable
                                className = "image-list tvs"
                                onChange = {updateMediaOrder2 } 
                                options={{
                                    animation: 150,
                                    group: {
                                        name: 'shared',
                                        pull: true,
                                        put: true
                                    },
                                    onAdd: function (evt) {
                                                var itemEl = evt.item;  // dragged HTMLElement
                                                evt.from;  // previous list
                                                // + indexes from onEnd
                                                var imagecode =itemEl.getAttribute("data-id");
                                                var tvname = FlowRouter.getParam("tvName");
                                                Meteor.call("addTVImage",  tvname, imagecode, 3000, (err, res) => {
                                                    if (!err) {

                                                    } else {
                                                        console.log(err);
                                                    }
                                                });
	                                }
                                }}
                            >
                                {
                                 this.props.tvsimages.map(tvsimage =>
                                    <ImageDetail imagecode={tvsimage.imagecode} tvname={tvsimage.tvname} tiempo={tvsimage.time} key={tvsimage._id}/>
                                )
                                } </Sortable> : <div className="alert alert-danger" role="alert">No media yet.</div>
                        } 
                    </div> 
            </div> 
            </div>
        );
    }
}

export default createContainer(props => {
    let data = Meteor.subscribe("codigos");
    var tvname = FlowRouter.getParam("tvName");
    let data2 = Meteor.subscribe('TVsImages.view', tvname);
    return {
        codigos: Codigos.find({}, { sort: { Order: 1 }}).fetch(),
        tvsimages: TVsImages.find({}, { sort: { order: 1 }}).fetch(tvname),
        ready: data.ready()
    }
}, TVView)