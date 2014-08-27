'use strict';

app.service('Auth', function($firebaseSimpleLogin, FIREBASE_URL, $rootScope){

	var FBRef = new Firebase(FIREBASE_URL)
	var auth = null;

	return {
		init: function() {
			// to be global user object
			auth = $firebaseSimpleLogin(FBRef);
        	return auth;
        },
        getCurrentUser: function(cb){
            return auth.$getCurrentUser();
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
});