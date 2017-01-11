import React, {Component} from 'react';
import Imageitem from '../Imageitem/Imageitem';
import { createContainer } from 'meteor/react-meteor-data';

class Imagerow extends Component {
    render() {
        return (
            <div className="ads">
                {this.props.codigos.map(codigo =>
                    <Imageitem codigo={codigo} key={codigo.Codigo}/>
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
}, Imagerow)
