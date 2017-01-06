Images = new FS.Collection("Images", {
    stores: [new FS.Store.GridFS("container")],
    // filter: {
    //     maxSize: 5242880,//bytes -> 5MB
    //     allow: {
    //         contentType: ['image/*']
    //     }
    // }
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
if(Meteor.isServer){
  Meteor.publish("files.all", function(){
    return Images.find({});
  })
}else{
  Meteor.subscribe("files.all")
}