import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    Meteor.methods({
        uploadFile:(fileInfo) => {
            /*Por seguridad podriamos implementar la subida
              del archivo en el server, es opcional
            */
        },
        deleteImage:(imageRef) => {
            if(Meteor.userId){
                Images.remove({_id: imageRef});
                Codigos.remove({Codigo: imageRef});
                return "ok";
            }else{
                throw new Meteor.Error("No hay usuario");
            }
        }
    })
});
