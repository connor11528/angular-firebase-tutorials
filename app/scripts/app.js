'use strict';

var app = angular.module('appToTakeOverTheWorldApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'routeSecurity',
  'simpleLoginTools',
  'pubnub.angular.service'
])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl'
    })
    .when('/profile/:username', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      authRequired: true,
      resolve: {
        profile: function(Auth, $q, $route, $location){
          var dfd = $q.defer();

          var username = $route.current.params.username;

          // check if current user matches :username
          Auth.getCurrentUser().then(function(currentUser){

            var currUsername = currentUser.thirdPartyUserData.screen_name;
            if (currUsername === username){
              dfd.resolve(currentUser);
            } else {
              dfd.reject('You can only view your own profile')
              $location.path('/login');
            }

          }, function(err){
            console.error('Could not get current user: ' + err);

            dfd.reject(err)
          });

          return dfd.promise;
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.constant('FIREBASE_URL', 'https://app2takeovertheworld.firebaseio.com/');

// if user tries to access protected route while not signed in
app.constant('loginRedirectPath', '/login');

app.run(function(Auth, $rootScope, PubNub){
  // establish authentication
  $rootScope.auth = Auth.init();

  // Fire up PubNub
  PubNub.init({
    publish_key:'pub-c-c9d3d41b-0f37-4177-b3d6-e5c38a8c6d6e',
    subscribe_key:'sub-c-5f5047a0-22ab-11e4-8fb1-02ee2ddab7fe',
    uuid:'an_optional_user_uuid_jasonshark_'
  })

})