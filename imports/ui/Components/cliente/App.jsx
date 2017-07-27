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
  /**
    Cambios en el componentDidUpdate,
    el tiempo que guardamos en DB ya no importa
    ahora lo que implemente es que el cycle se pause cada vez
    que el video se pause, por eso estan los eventos propios de
    html5 video, y si el video termina, pasa al siguiente slide,
    cada vez que se pasa a un nuevo slide, la libreria ejecuta
    before y after, entonces si el siguiente slide es un video,
    hace lo mismo sino, toma el tiempo de la imagen

    Lo que no funciona es que cuando es el ultimo slide y es un video,
    se queda en un loop con ese ultimo video y no pasa de ahi...
  **/
  componentDidUpdate() {
    if (this.props.tvsimages.length>1) {
      $('.carousel').cycle({
        fx: 'fade',
        speed: 500,
        timeoutFn: function (curr, next, opts, fwd) {
          if (curr.tagName === 'VIDEO') {
            curr.play();
            return 0;
          }
          return parseInt($(curr).attr('data-duration'));
        },
        after: function (curr, next, opts, fwd) {
          console.log('after');
          console.log(curr, next);
          if (curr.tagName === 'VIDEO') {
            curr.onwaiting = function() {
              $('.myspinner').css('display', 'flex');
              $('.carousel').cycle('pause');
              console.log('loading video');
            }
            curr.onplaying = function () {
              $('.myspinner').css('display', 'none');
              // $('.carousel').cycle('resume');
              console.log('playing video');
            }
            curr.onended = function () {
              $('.carousel').cycle('next');
              $('.myspinner').css('display', 'none');
              // $('.carousel').cycle('resume');
              console.log('ended video');
            }
          } else {
            $('.carousel').cycle('resume');
          }
        }
      });
    } else {
      console.log('Only 1 media');
    }
  }

  render() {
    let i = 0;
    return (
      <div className="cliente-container">
        <div className="myspinner">
          <i className="fa fa-circle-o-notch fa-spin"></i>
        </div>
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
