/********       Connecting to database + Creating user schema            **************/
var mongoose = require('mongoose');
var userFriendSchema = require('./db.userfriends.schema').userFriendSchema;
var UserFriend = mongoose.model('UserFriendM',userFriendSchema);
/** **********************************************************/


/*****      Connection to the database ( db_suitemybeer ) *****/


var addUserFriend = function(userFriendObj){
    mongoose.connect("mongodb://benari:123456@ds043972.mongolab.com:43972/db_suitemybeer");
    var conn = mongoose.connection;

    // Rest of code here
    conn.on('error',function(err){
        console.log('connection error' + err);
    });

    conn.once('open',function(){
        console.log("Connected to db_suitemybeer/userFriendsTable\n");

        /**********       Adding new UserFriend from facebook to User's collection              **********/
        var newUserFriend = new UserFriend({
            FirstName:userFriendObj.FirstName,
            LastName:userFriendObj.LastName,
            MediumProfilePicture:userFriendObj.MediumProfilePicture,
            HomeTown:userFriendObj.HomeTown,
            SocialPrivateId:userFriendObj.SocialPrivateId
        });

        /**     Check if Circle already exist        **/
        if(newUserFriend.isNew) {
            newUserFriend.save(function (err, doc) {
                console.log("\n UserFriend was added to UserFriend collection " + doc);
            })
        }
    });
    mongoose.disconnect();
};

// Exports

exports.addUserFriends = addUserFriend;
