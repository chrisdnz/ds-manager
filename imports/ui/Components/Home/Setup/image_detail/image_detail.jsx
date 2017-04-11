import React, {Component} from 'react';
import SliderTest from './SliderTest/SliderTest'
import Alert from 'react-s-alert';

class ImageDetail extends Component {
  constructor(props) {
    super(props);
  }




  render() {
    return (
      <div className='thumbnail'>
        <img className='photo' src={`http://fia.unitec.edu/cfs/files/Images/${this.props.codigo.Codigo}`}/>
        <div className='caption'>
          <SliderTest codigo = {this.props.codigo} tiempo = {this.props.codigo.Time/1000}/>
        </div>
      </div>
    );
  }
}

export default ImageDetail;
