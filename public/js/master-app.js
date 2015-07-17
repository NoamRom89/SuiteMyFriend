var suiteApp = angular.module('suiteApp',['ngRoute','ngAutocomplete','leaflet-directive','angular-carousel']);

var USER =  null; /**/
/*
{

        id: "10153356515014410",
        birthday: "05/25/1989",
        email: "benari1_kutai@yahoo.com",
        first_name: "Ben Ari",
        isNew: true,
        gender: "Male",
        hometown: {
            id: "102184499823699",
            name: "Quebec, Montreal"
        },
        last_name: "Kutai",
        link: "https://www.facebook.com/app_scoped_user_id/10153356515014410/",
        locale: "en_US",
        location: {
            id: "111853268841906",
            name: "Rehovot, Israel"
        },
        mediumProfilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p200x200/1610834_10152823206274410_2045878086116312477_n.jpg?oh=7a35a74f394b9695a57a2fb6beaca3ad&oe=55F08067&__gda__=1441648651_a2dc5d750e0df629db63895735809c66",
        name: "Ben Ari Kutai",
        relationship_status: "Single",
        smallProfilePicture: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p40x40/1610834_10152823206274410_2045878086116312477_n.jpg?oh=a4743f1ef762de4734ed3a7b2434a78e&oe=55E88EC0&__gda__=1442821295_ac942cc9712dc12de7d91f4e23ac7e8c",
        timezone: 3,
        updated_time: "2015-06-05T18:00:17+0000",
        verified: true,
        

};/**/

suiteApp .config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
    
    $locationProvider.html5Mode(true);

    $routeProvider.
    when('/', {
            templateUrl: 'templates/signup.html',
            controller: 'signupCntrl'
    }).
    when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'signupCntrl'
    }).
    when('/welcome', {
            templateUrl: 'templates/welcome.html',
            controller: 'welcomeCntrl'
    }).
    when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'homeCntrl'
    }).
    when('/guide', {
          templateUrl: 'templates/guide.html',
          controller: 'guideCntrl'
    }).
    when('/myfriends', {
           templateUrl: 'templates/myfriends.html',
           controller: 'myFriendsCntrl'
    }).
    when('/suitmyfriends', {
          templateUrl: 'templates/suitmyfriends.html',
          controller: 'suitmyfriendsCntrl'
    }).
    when('/invitefriends', {
          templateUrl: 'templates/invitefriends.html',
          controller: 'inviteFriendsCntrl'
    }).
    when('/selectfriends', {
          templateUrl: 'templates/selectfriends.html',
          controller: 'selectFriendsCntrl'
    }).
    when('/invitation', {
          templateUrl: 'templates/invitation.html',
          controller: 'invitationsCntrl'
    }).
    otherwise({
            redirectTo: '/'
    });
}]);

suiteApp.controller('masterCntrl', function($scope,$http,$location,connectedUser) {
         
    $(document).ready(function(){

        setTimeout(function(){
            $('#splashscreen').fadeOut(500);    
        },900);

    });

    $scope.changeURL = function(url){
        $location.path(url);
    };

    $scope.angFacebookLogin = function(){
        /**/
        $scope.friendList = [];
        facebookLogin(function(friendList){
                //friendList = getFacebookFriendsImages(friendList);
                
                delete friendList['paging'];
                delete friendList['summary'];
                friendList.data.forEach(function(friend){
                    friend.profilePicture = friend.picture.data.url
                    friend.bigProfilePicture = 'https://graph.facebook.com/'+ friend.id +'/picture?height=215&width=215';
                    delete friend['picture'];
                });

                USER.isNew = true;
                USER.friendsList = friendList.data;
                console.log('success',USER);
                $http.post(window.location.origin + '/api/userInsert', { user:USER } ).
                  success(function(data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    console.log('Success : data', data);
                    // if user has signed up or not
                    if(data == null){
                        $location.path('signup');
                    }else{
                        connectedUser.set(data);
                        $scope.connectedUser = data;
                        $location.path('welcome');
                    }

                  }).
                  error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('Error : data', data);
                    console.log('Error : status', status);
                    console.log('Error : headers', headers);
                    console.log('Error : config', config);
                    // Redirect user back to login page
                    $location.path('signup');
                  });
        });/**/

        /* API CALL IN LOCALHOST 
        $http.post( window.location.origin + '/api/userInsert', { user:USER } ).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('Success : data', data);
                // if user has signed up or not
                if(data == null){
                    $location.path('signup');
                }else{
                    console.log('data',data);
                    connectedUser.set(data);
                    $scope.connectedUser = data;
                    $location.path('welcome');
                }

              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('Error : status', status);
                // Redirect user back to login page
                $location.path('signup');
              });
        /* End API CALL IN LOCALHOST */        
    }

});