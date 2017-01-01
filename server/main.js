import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    Meteor.methods({
        uploadFile:(fileInfo) => {
            /*Por seguridad podriamos implementar la subida
              del archivo en el server, es opcional
            */
        }
    })
});
