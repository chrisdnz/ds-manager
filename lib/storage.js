Images = new FS.Collection("Images", {
    stores: [
      new FS.Store.GridFS("thumbs", {
        transformWrite: function(fileObj, readStream, writeStream) {
          // Transform the image into a 10x10px thumbnail
          gm(readStream, fileObj.name()).resize('150', '240').stream().pipe(writeStream);
        }
    }),
    new FS.Store.GridFS("container")
    ],
    // filter: {
    //     maxSize: 5242880,//bytes -> 5MB
    //     allow: {
    //         contentType: ['image/*']
    //     }
    // }
});




Codigos = new Mongo.Collection("Codigos");
Counters = new Mongo.Collection('counters');
TVs = new Mongo.Collection("TVs");
TVsImages = new Mongo.Collection("TVsImages");
Meteor.users.allow({
    insert: ()=> {
        return false;
    },
    remove: ()=> {
        return false;
    },
    update: ()=> {
        return false;
    },
});
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
        return false;
    },
    remove: ()=> {
        return false;
    },
    update: ()=> {
        return false;
    }
});
TVs.allow({
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
TVsImages.allow({
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
Meteor.users.deny({
    insert: ()=> {
        return true;
    },
    remove: ()=> {
        return true;
    },
    update: ()=> {
        return true;
    },
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
        return true;
    },
    remove: ()=> {
        return true;
    },
    update: ()=> {
        return true;
    }
});
TVs.deny({
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
TVsImages.deny({
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
Meteor.startup(() => {
    Meteor.methods({
        incrementarContador:() => {
           // setCounter(Counters, 'cantMedia', 0)
           return incrementCounter(Counters, 'cantMedia', 1)
        },
        updateOrder:(Codigo, order) => {
           // setCounter(Counters, 'cantMedia', 0)
           Codigos.update({Codigo: Codigo}, {$set: {Order: order}});
        },
        updateTVOrder:(tvname, imagecode, order) => {
           // setCounter(Counters, 'cantMedia', 0)
           TVsImages.update({tvname: tvname, imagecode:imagecode}, {$set: {order: order}});
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
  Meteor.publish("TVs", function(){
    return TVs.find();
  })
  Meteor.publish('TVsImages.view', (tvname) => {
  return TVsImages.find({tvname});
});
  Meteor.publish('users', function (){
    return Meteor.users.find({})
  })
}
