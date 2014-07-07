'use strict';

angular.module('appToTakeOverTheWorldApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('appToTakeOverTheWorldApp')
.constant('FIREBASE_URL', 'https://app2takeovertheworld.firebaseio.com/');