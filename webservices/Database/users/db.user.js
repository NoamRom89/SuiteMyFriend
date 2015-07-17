// mongoose Connection
var mongoose = require('mongoose');
// Require user schema JS file
var userSchema = require('./db.user.schema').userSchema;
// User Model
var User = mongoose.model('UserM', userSchema);

// Add user function
var addUser = function(userObj,callback) {
    // Connect if not connected already
    if(!mongoose.connection.readyState){
        mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");    
    }

    var conn = mongoose.connection;
    // Add circles to user.
    userObj.circles = [];

    if(userObj.hometown != null)
        userObj.circles.push(userObj.hometown.name);

    if(userObj.gender != null)
        userObj.circles.push(userObj.gender);

    // Add an empty event array for user.
    userObj.events = [];
    // add empty categories array for user.
    // add empty circles array for user.
    console.log('userObj.friendsList',userObj.friendsList)
    if(userObj.friendsList != null && userObj.friendsList.length > 0){
        userObj.friendsList.forEach(function(value,key){
            value.categories = [];
            value.circles = [];
          
            if(value.hometown != null){   
                value.circles.push({ value:value.hometown.name });
            }

            if(value.gender != null){
                value.circles.push({ value: value.gender });
            }

        });
    }

    


    // Adding new user from facebook to User's collection
    var newUser = new User({
        userObject: userObj
    });

    var query = User.findOne().where('userObject.email',userObj.email);
    query.exec(function(err,user){
        if(err){
            console.log('err',err);
        }else{
            if(user == null){
                newUser.save(function (err, doc) {
                    if(err){                    
                        console.log("err",err);
                    }else{
                        console.log("\nUser was added to User collection");
                        callback(newUser);
                    }                
                });
            }else{
                callback(user);
            }
        }
    });
};

var getUser = function(userId,callback) {
    console.log('userId',userId);
    // Connect if not connected already
    if(!mongoose.connection.readyState){
        mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");    
    }

    var conn = mongoose.connection;

    var query = User.findOne().where('_id',userId);
    query.exec(function(err,user){
        if(err){
            console.log('err',err);
        }else{
            console.log('getUser getUser getUser getUser',user.userObject.friendsList);
            callback(user);
        }
    });
};

var changeIsNew = function(userId,callback) {
    var query = User.findOne().where('_id',userId);
    query.exec(function(err,user){
        if(err){
            console.log('err',err);
        }else{
            console.log('user found at changeIsNew before change',  user.userObject.isNew);
            user.userObject.isNew = false;
            console.log('user found at changeIsNew after change',  user.userObject.isNew);
            User.findOneAndUpdate( { _id:userId } ,user,function (err, doc) {
                if(err){
                    console.log("err",err);
                }else{
                    console.log("\nIsNew has changed :",doc.userObject.isNew);
                    callback(user);
                }
            });
        }
    });
}
// Exports

exports.addUser = addUser;
exports.getUser = getUser;
exports.changeIsNew = changeIsNew;