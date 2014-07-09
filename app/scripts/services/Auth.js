'use strict';

app.service('Auth', ['$firebaseSimpleLogin', 'FIREBASE_URL', 
	function($firebaseSimpleLogin, FIREBASE_URL){

		var FBRef = new Firebase(FIREBASE_URL)
		var auth = null;

		return {
			init: function() {
				auth = $firebaseSimpleLogin(FBRef);
	        	return auth;
	        },
			loginWithTwitter: function(cb){
	            auth.$login('twitter').then(function(user){
	                if (cb) cb(null, user)
	            }, cb)
	        },
	        logout: function(){
	        	auth.$logout()
	        }
	    };

	}])