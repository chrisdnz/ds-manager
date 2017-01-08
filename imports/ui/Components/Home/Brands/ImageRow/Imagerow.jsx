import React, {Component} from 'react';
import Imageitem from '../Imageitem/Imageitem';
import { createContainer } from 'meteor/react-meteor-data';

class Imagerow extends Component {
    render() {
        return (
            <div className="ads">
                {this.props.images.map(image =>
                    <Imageitem image={image} key={image._id}/>
                )}
            </div>
        );
    }
}

export default createContainer(props => {
    let data = Meteor.subscribe("files.all");
    return {
        images: Images.find({}).fetch(),
        ready: data.ready()
    }
}, Imagerow)