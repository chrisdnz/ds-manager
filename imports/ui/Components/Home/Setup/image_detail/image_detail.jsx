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
      <div className='thumbnail ads' data-id={ this.props.imagecode } data-format={ this.props.mediaFormat } data-duration={this.props.tiempo} key={ this.props.imagecode}>
        <Imageitem imagecode={this.props.imagecode} mediaFormat={this.props.mediaFormat} tvname={this.props.tvname} />
        {
          this.props.mediaFormat.split('/')[0] === 'image' ? (
            <div className='caption'>
              <SliderTest imagecode={this.props.imagecode} tvname={this.props.tvname} mediaFormat={this.props.mediaFormat} tiempo={this.props.tiempo}/>
            </div>
          ) : (
            <section>
              <div className="rangeValues">Video</div>
            </section>
          )
        }
      </div>
    );
  }
}

export default ImageDetail;
