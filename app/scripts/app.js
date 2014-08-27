'use strict';

var app = angular.module('appToTakeOverTheWorldApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'routeSecurity',
  'simpleLoginTools'
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

app.run(function(Auth, $rootScope){
  // establish authentication
  $rootScope.auth = Auth.init();

})