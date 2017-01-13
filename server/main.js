import { Meteor } from 'meteor/meteor';
import '../imports/api/Ads';

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
                throw new Meteor.Error("No-autorizado");
            }
        },
        timeoutAd:(timeout, id) => {
            if(Meteor.userId){
                // Ad.insert({timeOut: timeout});
                Ad.update({_id: id}, {$set: {timeOut: timeout}});
                return "Ok";
            }else{
                throw new Meteor.Error("No-autorizado");
            }
        }
    })
});
