var suiteApp = angular.module('suiteApp',['ngRoute']);
  
suiteApp .config(['$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
    $routeProvider.
    when('/signup', {
            templateUrl: 'templates/signup.html',
            controller: 'signupCntrl'
    }).
    when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'homeCntrl'
    }).
    otherwise({
            redirectTo: '/signup'
    });
    $locationProvider.html5Mode(true);
}]);

suiteApp.controller('masterCntrl', function($scope) {
     
    $scope.connectedUser = null;
    
    $(document).ready(function(){
        console.log('init');
        //$scope.connectedUser = checkLoginState();
    });

    $scope.facebookLogin = function(){
        if(facebookLogin() == 'connected'){
            console.log('facebook connected');
            $scope.connectedUser = makeApiCalls();
            console.log('$scope.connectedUser',$scope.connectedUser);
        }
    }

});