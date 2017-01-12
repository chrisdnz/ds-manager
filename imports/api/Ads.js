Ad = new Mongo.Collection('ads');
let schema = {};
schema.Ad = new SimpleSchema({
    timeOut: {
        type: Number
    }
});
Ad.attachSchema(schema.Ad);

if(Meteor.isServer) {
    Meteor.publish("ads", function(){
      return Ad.find({});
    });
}
