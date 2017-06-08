import React, { Component } from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { createContainer } from 'meteor/react-meteor-data';
import './cycle.js';
let SELF;
class App extends Component {
  constructor(props) {
    super(props);
    SELF=this;
    this.state = {
      ordering: -1,
      images: [
        {
          id: "ejYv7HrKtZYvPiq4c",
          url: "https://i.ytimg.com/vi/GTBaQ2DcGUk/maxresdefault.jpg",
          timer: 10000,
        },
        {
          id: "eWofD2biM4KTR6zsi",
          url: "http://techrasa.com/wp-content/uploads/2016/05/google-services-open-iran.jpg",
          timer: 1500,
        },
        {
          id: "eLrSxLAPXj8zbgcQ8",
          url: "http://s.newsweek.com/sites/www.newsweek.com/files/2016/06/22/iphone-7-apple-redesign-2017-rumors-specs.jpg",
          timer: 6500,
        },
        {
          id: "eApzarndTAWwTmTx7",
          url: "https://www.wired.com/wp-content/uploads/2016/05/youtube-logos-f.jpg",
          timer: 20500,
        }
      ]
    }
  }
  componentDidMount() {
    var cursor = Codigos.find();
cursor.observeChanges({
    changed(newDocument, oldDocument){

    }
});

  }

  componentDidUpdate() {
    $('.carousel').cycle({
      fx: 'fade',
      speed:  500,
      timeoutFn: function (curr, next, opts, fwd) {
        return parseInt($(curr).attr('data-duration'));
      }
    });
  }

  render() {
    let i=0;
    return (
      <div className="cliente-container">
        <div className="carousel">
          {this.props.codigos.map(image=> (
            <img src={`http://localhost:3000/cfs/files/Images/${image.Codigo}`} data-duration={image.Time} key={image._id}></img>
          ))}
        </div>
        <div className='hidden'>{this.state.ordering}</div>
      </div>
    );
  }
}
export default createContainer(props => {
  let data = Meteor.subscribe("codigos");
  let time = Meteor.subscribe("ads");
  return {
    codigos: Codigos.find({}, { sort: { Order: 1 } }).fetch(),
    ads: Ad.find({}).fetch(),
  }
}, App);
