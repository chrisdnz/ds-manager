Images = new FS.Collection("images", {
  stores: [new FS.Store.GridFS("container")],
  filter: {
      allow: {
          contentType: ['image/*']
      }
  }
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
Codigos = new Mongo.Collection('codigos');
