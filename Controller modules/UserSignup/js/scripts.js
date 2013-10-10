var chatApp = angular.module("chatApp", ["firebase"]);

function loginCtrl($scope, angularFire) {
	//links up to firebase and grabs all the users and stores it in the scope.users array
	var url = new Firebase("https://gamerscafe.firebaseio.com/gamerscafe/users");
	$scope.users = [];
	angularFire(url, $scope, "users");
	
	
	var userRef = new Firebase("https://gamerscafe.firebaseio.com/");
	//uses facebook login to grab the user info and prepopulate all the fields
	var authenticate = new FirebaseSimpleLogin(userRef, function(error, user) {
		if (user) {
			//generates a url to get the image based on their unique username
			$scope.picurl = "http://graph.facebook.com/" + user.username + "/picture?type=large";
			$scope.fullname = user.displayName;
			$scope.username = user.username;
			$scope.email = user.email;
		} else {
			//visual feedback of error
			console.log("No user Detected");
		}
	});
	
	
	$scope.login = function(){
		//calls the login function of the firebase login
		authenticate.login('facebook', {
			//asks for email for each user as well
			scope: "email"
		});
	};
		
	$scope.addUser = function(){
		//creates a user object from all of the fields and pushes it to the firebase table
		$scope.users.push({"displayName": $scope.fullname, "username": $scope.username, "email": $scope.email,"bio": $scope.userbio, "password": $scope.password, "profilePic": $scope.picurl});
	};

}



