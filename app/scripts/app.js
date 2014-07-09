'use strict';

var app = angular.module('appToTakeOverTheWorldApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.constant('FIREBASE_URL', 'https://app2takeovertheworld.firebaseio.com/');

app.run(['Auth', '$rootScope', function(Auth, $rootScope){
  // establish authentication
  $rootScope.auth = Auth.init();
  // $rootScope.FIREBASE_URL = FIREBASE_URL;
}])