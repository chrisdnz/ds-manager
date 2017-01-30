import React, {Component} from 'react';
import ImageDetail from '../image_detail/image_detail';
import { createContainer } from 'meteor/react-meteor-data';

class ImageList extends Component {
    render() {
        return (
            <div className='image-list'>
                {this.props.codigos.map(codigo =>
                    <ImageDetail codigo={codigo} key={codigo._id}/>
                )}
            </div>
        );
    }
}

export default createContainer(props => {
    let data = Meteor.subscribe("files.all");
    return {
        images: Images.find({}).fetch(),
        codigos: Codigos.find({}).fetch(),
        ready: data.ready()
    }
}, ImageList)
