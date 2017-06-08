import React, {Component} from 'react';
import ImageDetail from '../image_detail/image_detail';
import Sortable from 'react-sortablejs';
import { createContainer } from 'meteor/react-meteor-data';


const updateMediaOrder = (items) => {
  items.forEach((_id, order) => {
    Meteor.call("updateOrder", _id, order, (err, res)=> {
                  if(!err) {
                      
                  }else{
                      console.log(err);
                  }
              });
  });
  
};

class ImageList extends Component {
    render() {
        return (
             this.props.codigos.length > 0 ? <Sortable
    className="image-list"
    onChange={ updateMediaOrder }
  >
  
                {this.props.codigos.map(codigo =>
                    <ImageDetail codigo={codigo} key={codigo._id}/>
                )}
           </Sortable> : <div className="alert alert-danger" role="alert">No media yet.</div>
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
}, ImageList)
