import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import './cycle.js';
let SELF;
class App extends Component {
  constructor(props) {
    super(props);
    SELF = this;
  }
  componentDidUpdate() {
    if (this.props.tvsimages.length>1) {
      $('.carousel').cycle({
        fx: 'fade',
        speed: 500,
        timeoutFn: function (curr, next, opts, fwd) {
          return parseInt($(curr).attr('data-duration'));
        },
        after: function (curr, next, opts, fwd) {

        },
        before: function (curr, next, opts, fwd) {

          let siguiente = this;
          let actual = curr;
          console.log('actual',actual);
          console.log('siguiente',siguiente);
          if (actual.tagName === 'VIDEO') {
            let ended = setInterval(function () {
              if (actual.ended) {
                $('.carousel').cycle('resume');
                if (siguiente.tagName === 'VIDEO') {
                  siguiente.play();
                }
                clearInterval(ended);
              } else {

                $('.carousel').cycle('pause');
              }
            }, 1000);
          } else {
              
            if (siguiente.tagName === 'VIDEO') {
              siguiente.play();
            }
          }
        },
      });
    }

  }

  render() {
    let i = 0;
    return (
      <div className="cliente-container">
        <div className="carousel">
          {this.props.tvname != undefined && (
            this.props.tvsimages.length > 0 ? (
              this.props.tvsimages.map(image => (
                image.fileFormat.split('/')[0] === 'image' ? (
                  <img src={`http://localhost:3000/cfs/files/Images/${image.imagecode}`} data-duration={image.time} key={image._id}></img>
                ) : (
                  <video id="myVideo" data-duration={parseFloat(image.time)*1000} key={image._id}>
                    <source src={`http://localhost:3000/cfs/files/Images/${image.imagecode}`} type={image.fileFormat}/>
                  </video>
                )
              ))
            ) : (
              <h1 style={{color: '#FFF',fontSize: 32}}>No hay contenido para {this.props.tvname}</h1>
            )
          )}
        </div>
      </div>
    );
  }
}
export default createContainer(props => {
  let data = Meteor.subscribe("codigos");
  let time = Meteor.subscribe("ads");
  var tvname = FlowRouter.getParam("tvName");
  let data2 = Meteor.subscribe('TVsImages.view', tvname);
  return {
    codigos: Codigos.find({}, { sort: { Order: 1 } }).fetch(),
    tvsimages: TVsImages.find({}, { sort: { order: 1 } }).fetch(tvname),
    tvname: tvname,
    ads: Ad.find({}).fetch(),
  }
}, App);
