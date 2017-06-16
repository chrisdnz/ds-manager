import React, {Component} from 'react';
import SliderTest from './SliderTest/SliderTest'
import Alert from 'react-s-alert';

class ImageDetail extends Component {
  constructor(props) {
    super(props);
  }




  render() {
    return (
      <div className='thumbnail' data-id={ this.props.imagecode } key={ this.props.imagecode}>
        <img className='photo' src={`http://localhost:3000/cfs/files/Images/${this.props.imagecode}`}/>
        <div className='caption'>
          <SliderTest imagecode = {this.props.imagecode} tvname={this.props.tvname} tiempo = {this.props.tiempo}/>
        </div>
      </div>
    );
  }
}

export default ImageDetail;
