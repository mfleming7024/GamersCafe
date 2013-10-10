var chatApp = angular.module("chatApp", ["firebase"]);

function loginCtrl($scope, angularFire) {
	var url = new Firebase("https://gamerscafe.firebaseio.com/gamerscafe/users");
	$scope.users = [];
	angularFire(url, $scope, "users");
	
	var userRef = new Firebase("https://gamerscafe.firebaseio.com/");
	var authenticate = new FirebaseSimpleLogin(userRef, function(error, user) {
		console.log(user);
		fbUser = user;
		if (user) {
			$scope.picurl = "http://graph.facebook.com/" + fbUser.username + "/picture";
			$scope.fullname = fbUser.displayName;
			$scope.username = fbUser.username;
			$scope.email = fbUser.email;
		} else {
			console.log("No user Detected");
		}
	});
	
	
	$scope.login = function(){
		authenticate.login('facebook', {
			scope: "email"
		});
	};
		
	$scope.addUser = function(){
		$scope.users.push({"displayName": $scope.fullname, "username": $scope.username, "email": $scope.email,"bio": $scope.userbio, "password": $scope.password, "profilePic": $scope.picurl});
	};

}



