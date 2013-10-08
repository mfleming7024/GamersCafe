var gamerscafe = angular.module('gamerscafe', ['firebase']);

gamerscafe.run(['angularFireAuth', function(angularFireAuth){
	var url = "https://gamerscafe.firebaseio.com/";
	angularFireAuth.initialize(url, {'name':'user', 'path':'/'});
}]);

gamerscafe.controller('Core', ['$scope', 'angularFireCollection', 'angularFireAuth', function mtCtrl($scope, angularFireCollection, angularFireAuth){
	var url = 'https://gamerscafe.firebaseio.com/';

	var fbUser;

	// Creates an instance of Firebase and connects to our URL
	var myConn 	= new Firebase('https://gamerscafe.firebaseio.com/gamerscafe');

	// instance of firebase connection to login with 
	var auth = new FirebaseSimpleLogin(myConn, function(error, user) {
		fbUser = user;
		console.log(fbUser);
	});
	

	$scope.login = function(){
		auth.login('facebook');
	}
}])