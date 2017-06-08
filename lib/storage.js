Images = new FS.Collection("Images", {
    stores: [new FS.Store.GridFS("container")],
    // filter: {
    //     maxSize: 5242880,//bytes -> 5MB
    //     allow: {
    //         contentType: ['image/*']
    //     }
    // }
});
Codigos = new Mongo.Collection("Codigos");
Counters = new Mongo.Collection('counters');
Images.allow({
    insert: ()=> {
        return true;
    },
    remove: ()=> {
        return true;
    },
    update: ()=> {
        return true;
    },
    download: ()=> {
        return true
    }
});

Counters.allow({
    insert: ()=> {
        return true;
    },
    remove: ()=> {
        return true;
    },
    update: ()=> {
        return true;
    }
});
Codigos.allow({
    insert: ()=> {
        return true;
    },
    remove: ()=> {
        return true;
    },
    update: ()=> {
        return true;
    }
});
Images.deny({
    insert: ()=> {
        return false;
    },
    remove: ()=> {
        return false;
    },
    update: ()=> {
        return false;
    },
    download: ()=> {
        return false;
    }
});

Counters.deny({
    insert: ()=> {
        return false;
    },
    remove: ()=> {
        return false;
    },
    update: ()=> {
        return false;
    }
});
Codigos.deny({
    insert: ()=> {
        return false;
    },
    remove: ()=> {
        return false;
    },
    update: ()=> {
        return false;
    }
});
Meteor.startup(() => {
    Meteor.methods({
        incrementarContador:() => {
           // setCounter(Counters, 'cantMedia', 0)
           return incrementCounter(Counters, 'cantMedia', 1)
        },
        updateOrder:(_id, order) => {
           // setCounter(Counters, 'cantMedia', 0)
           Codigos.update({_id: _id}, {$set: {Order: order}});
        },
    })
})

if(Meteor.isServer){
  Meteor.publish("files.all", function(){
    return Images.find();
  });
  Meteor.publish("codigos", function(){
    return Codigos.find();
  })
  Meteor.publish("counters", function(){
    return Counters.find();
  })
}
