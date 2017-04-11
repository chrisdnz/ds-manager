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
      inputValue: props.codigo.Time/1000,
      firstValue: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setValue = this.setValue.bind(this);
  }
  componentWillMount(){
    this.setState({firstValue: this.props.tiempo/1000});
  }

  setValue() {
    this.setState({
      inputValue: this.refs.rangeValue.value
    });
  }

  handleChange(name, event, imageRef){
    let componentRef = this;
    let value = event.target.value;
    this.setState({firstValue: value});
    Meteor.call("timeoutbyAd", componentRef.props.codigo, value*1000, (err, res)=> {
      if (!err) {
        Alert.info(`Timer actualizado a ${value} segundos`, {
          position: 'bottom-right',
          effect: 'slide',
          timeout: 3000
        });
      }
    })
  }

  render () {
    return (
      <section>
        <div className="rangeValues">Tiempo : {this.state.inputValue}s</div>
        <section className="range-slider">
          <input type="range" ref="rangeValue" value={this.state.inputValue} min={this.state.minValue} max={this.state.maxValue} step={this.state.step} onMouseUp={this.handleChange.bind(this, "first")} onChange={this.setValue}/>
        </section>
      </section>
    );
  }
}

export default SliderTest;
// export default createContainer(props => {
//     Meteor.subscribe("files.all");
//     return {
//         images: Images.find({}).fetch(),
//         codigos: Codigos.find({}).fetch()
//     }
// }, SliderTest);
