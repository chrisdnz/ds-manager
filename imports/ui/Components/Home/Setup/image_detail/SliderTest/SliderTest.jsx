import React, { Component } from 'react';
import Alert from 'react-s-alert';
import { createContainer } from 'meteor/react-meteor-data';

class SliderTest extends Component {
  constructor(props){
    super(props);

    this.state = {
      minValue: 1,
      maxValue: 60,
      step: 1,
      firstValue: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
    this.setState({firstValue: this.props.tiempo/1000});
  }

  handleChange(name, event, imageRef){
    let componentRef = this;
    let value = event.target.value;
    this.setState({firstValue: value});
    //console.log({value: value});
    Meteor.call("timeoutbyAd", componentRef.props.codigo, value*1000, (err, res)=> {

    })
  }
  render () {
    return (
      <section>
        <div className="rangeValues">Tiempo : {this.props.codigo.Time/1000}s</div>
        <section className="range-slider">
          <input type="range" value={this.props.codigo.Time/1000} min={this.state.minValue} max={this.state.maxValue} step={this.state.step}  onChange={this.handleChange.bind(this, "first")}/>
        </section>
      </section>
    );
  }
}

export default createContainer(props => {
    Meteor.subscribe("files.all");
    return {
        images: Images.find({}).fetch(),
        codigos: Codigos.find({}).fetch()
    }
}, SliderTest);
