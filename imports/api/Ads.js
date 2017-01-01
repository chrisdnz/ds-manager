Ad = new Mongo.Collection('ads');
let schema = {};
schema.Ad = new SimpleSchema({
    adUrls: {
        type: Array,
        defaultValue: []
    },
    timeOut: {
        type: Number
    }
});
Ad.attachSchema(schema.Ad);