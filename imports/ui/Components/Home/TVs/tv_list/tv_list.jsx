import React, {Component} from 'react';

import { createContainer } from 'meteor/react-meteor-data';





class TVList extends Component {
     constructor(props) {
    super(props);
  }
    handleCick(event, Name) {
        event.preventDefault();
        FlowRouter.go(`/home/${Name}`);
    }
    render() {
        return (
             this.props.tvs.length > 0 ? 
                <div className="list-group">
                   {this.props.tvs.map(({ _id, Name }) =>  (
     <button type="button" onClick={()=> this.handleCick(event, Name)} key={_id} className="list-group-item list-group-item-info">{Name}</button>
    ))}
</div> : <div className="alert alert-danger" role="alert">No TVs yet.</div>
        );
    }
}

export default createContainer(props => {
    let data = Meteor.subscribe("TVs");
    return {
        tvs: TVs.find({}).fetch(),
        ready: data.ready()
    }
}, TVList)
