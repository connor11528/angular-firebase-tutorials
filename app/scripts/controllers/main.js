'use strict';

app.controller('MainCtrl', function ($scope, PubNub, $rootScope) {

	var global_chat = 'global_chat';

	PubNub.ngSubscribe({ channel: global_chat });

	$scope.messages = [];

	$scope.sendChat = function(){
		console.log($scope.currentMess)
		
		PubNub.ngPublish({
		    channel: global_chat,
		    message: $scope.currentMess
		  });
		$scope.currentMess = '';
	};

	// Storage is not enabled for this subscribe key. Please contact help@pubnub.com
	// PubNub.ngHistory({channel: global_chat, count:500});

	$scope.$watch('messages', function(){
		console.log('messages updated');
		console.log($scope.messages);
	}, true)

	// listen for global chat messages
	$rootScope.$on(PubNub.ngMsgEv(global_chat), function(event, payload) {

	    $scope.messages.push({
	    	user: $rootScope.auth.user.thirdPartyUserData.screen_name,
	    	message: payload.message
	    })
	});

});