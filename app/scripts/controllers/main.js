'use strict';

app.controller('MainCtrl', function ($scope, Terminator, Auth) {

	$scope.terminators = Terminator.all;

	$scope.createTerminator = function(){
		Terminator.create($scope.terminator).then(function(data){
			$scope.terminator.name = ''
		})
	};

	$scope.deleteTerminator = function(terminatorId){
		Terminator.delete(terminatorId).then(function(data){
			console.log('Terminator deleted!')
		})
	};
});