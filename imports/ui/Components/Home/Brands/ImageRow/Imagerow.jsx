import React, {Component} from 'react';
import Imageitem from '../Imageitem/Imageitem';
import { createContainer } from 'meteor/react-meteor-data';

class Imagerow extends Component {
    render() {
        return (
            <div className="ads">
                {this.props.codigos.map(codigo =>
                    <Imageitem imagecode={codigo.Codigo} key={codigo._id}/>
                )}
            </div>
        );
    }
}

export default createContainer(props => {
    let data = Meteor.subscribe("files.all");
    return {
        images: Images.find({}).fetch(),
        codigos: Codigos.find({}, { sort: { Order: 1 } }).fetch(),
        ready: data.ready()
    }
}, Imagerow)
