import React, {Component} from 'react';
import SliderTest from './SliderTest/SliderTest'
import Imageitem from '../../Brands/Imageitem/Imageitem';
import Alert from 'react-s-alert';

class ImageDetail extends Component {
  constructor(props) {
    super(props);
  }




  render() {
    return (
      <div className='thumbnail ads' data-id={ this.props.imagecode } key={ this.props.imagecode}>
        <Imageitem imagecode={this.props.imagecode} tvname={this.props.tvname} />
        <div className='caption'>
          <SliderTest imagecode = {this.props.imagecode} tvname={this.props.tvname} tiempo = {this.props.tiempo}/>
        </div>
      </div>
    );
  }
}

export default ImageDetail;
