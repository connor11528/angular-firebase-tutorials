'use strict';

app.service('Terminator', ['$firebase', 'FIREBASE_URL', function($firebase, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL + 'terminators');

	var terminators = $firebase(ref);

	return {
		all: terminators,
		create: function(terminator){
			// add to database, return promise
			return terminators.$add(terminator)
		},
		delete: function(terminatorId){
			return terminators.$remove(terminatorId)
		}
	}
}]);