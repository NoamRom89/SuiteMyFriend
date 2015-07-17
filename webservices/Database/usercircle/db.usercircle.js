/********       Connecting to database + Creating user schema            **************/
var mongoose = require('mongoose');
var userCircleSchema = require('./db.usercircle.schema').userCircleSchema;
var UserCircle = mongoose.model('UserCircleM',userCircleSchema);
/** **********************************************************/

var getUserCircles = function(userId,callback){
    
    var query = UserCircle.find().where({'UserId':userId});
    query.exec(function(err,userCircles){
        if(err){
            console.log('err',err);
        }else{
            if(userCircles != null){
                console.log('userCircles',userCircles);
                callback(userCircles);
            }
               
        }
    });
}

exports.getUserCircles = getUserCircles;