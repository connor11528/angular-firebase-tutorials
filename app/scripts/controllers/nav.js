'use strict';

app.controller('NavCtrl', ['$scope', 'Auth', function ($scope, Auth) {

	$scope.login = function(){
		Auth.loginWithTwitter(function(err, user){
			if(err) return console.error(err.toString());

			console.log('Cool you logged in')
			console.log(user)
		})
	};

	$scope.logout = function(){
		Auth.logout()
	}
}])