import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import './cycle2.js';

class App extends Component {
  /**
    CycleJS 1
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
  // componentDidUpdate() {
  //   if (this.props.tvsimages.length>1) {
  //     $('.carousel').cycle({
  //       fx: 'fade',
  //       speed: 500,
  //       timeoutFn: function (curr, next, opts, fwd) {
  //         if (curr.tagName === 'VIDEO') {
  //           curr.play();
  //           return 0;
  //         }
  //         return parseInt($(curr).attr('data-duration'));
  //       },
  //       end: function() {
  //         console.log('end');
  //       },
  //       autostop: 0,
  //       before: function(curr, next, opts, fwd) {
  //         console.log('before');
  //         if (curr.tagName === 'VIDEO') {
  //           curr.onwaiting = function() {
  //             $('.myspinner').css('display', 'flex');
  //             $('.carousel').cycle('pause');
  //             console.log('loading video');
  //           }
  //           curr.onplaying = function () {
  //             $('.myspinner').css('display', 'none');
  //             // $('.carousel').cycle('resume');
  //             console.log('playing video');
  //           }
  //           curr.onended = function () {
  //             $('.myspinner').css('display', 'none');
  //             $('.carousel-').cycle('next');
  //             // $('.carousel').cycle('resume');
  //             console.log('ended video');
  //           }
  //         } else {
  //           $('.carousel').cycle('resume');
  //         }
  //       },
  //       after: function (curr, next, opts, fwd) {
  //         console.log('after');
  //       }
  //     });
  //   } else {
  //     console.log('Only 1 media');
  //   }
  // }
  /**
    CycleJS 2
  **/
  componentDidMount() {
    $('.carousel').on('cycle-initialized', function(event, opts) {
      if (opts.slides[0].firstChild.tagName === 'VIDEO') {
        $('.carousel').cycle('pause');
        opts.slides[0].firstChild.currentTime = 0;
        opts.slides[0].firstChild.load();
        opts.slides[0].firstChild.play();
        opts.slides[0].firstChild.onplaying = function() {
          $('.myspinner').css('display', 'none');
        }
        opts.slides[0].firstChild.onwaiting = function() {
          $('.myspinner').css('display', 'flex');
          $('.carousel').cycle('pause');
        }
        opts.slides[0].firstChild.onended = function() {
          $('.myspinner').css('display', 'none');
          $('.carousel').cycle('resume');
        }
      }
    });
    $('.carousel').on('cycle-slide-added', function(event, jQueryWrappedSlideEl) {
      console.log('new slide added');
    });
    $('.carousel').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
      if (incomingSlideEl.firstChild.tagName === 'VIDEO') {
        $('.carousel').cycle('pause');
        incomingSlideEl.firstChild.currentTime = 0;
        incomingSlideEl.firstChild.load();
        incomingSlideEl.firstChild.play();
        incomingSlideEl.firstChild.onplaying = function() {
          $('.myspinner').css('display', 'none');
        }
        incomingSlideEl.firstChild.onwaiting = function() {
          $('.myspinner').css('display', 'flex');
          $('.carousel').cycle('pause');
        }
        incomingSlideEl.firstChild.onended = function() {
          $('.myspinner').css('display', 'none');
          $('.carousel').cycle('resume');
        }
      } else {
        // Imagen
      }
    });
  }
  componentDidUpdate() {
    if (this.props.tvsimages.length > 1) {
      $('.myspinner').css('display', 'none');
      $('.carousel').cycle('destroy');
      $('.carousel').cycle();
    }
  }
  render() {
    let i = 0;
    return (
      <div className="cliente-container">
        <div className="myspinner">
          <i className="fa fa-circle-o-notch fa-spin"></i>
        </div>
        <div className="carousel" data-cycle-slides="> div">
          {this.props.tvname != undefined && (
            this.props.tvsimages.length > 0 ? (
              this.props.tvsimages.map(image => (
                image.fileFormat.split('/')[0] === 'image' ? (
                  <div key={image._id} data-cycle-timeout={image.time}>
                    <img src={`http://fia.unitec.edu/cfs/files/Images/${image.imagecode}`}></img>
                  </div>
                ) : (
                  <div key={image._id} data-cycle-timeout="200">
                    <video id="myVideo">
                      <source src={`http://fia.unitec.edu/cfs/files/Images/${image.imagecode}`} type={image.fileFormat}/>
                    </video>
                  </div>
                )
              ))
            ) : (
              <div>
                <h1 style={{color: '#FFF',fontSize: 32}}>No hay contenido para {this.props.tvname}</h1>
              </div>
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
