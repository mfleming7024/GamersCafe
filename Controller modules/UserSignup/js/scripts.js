var chatApp = angular.module("chatApp", ["firebase"]);

function loginCtrl($scope, angularFireCollection) {
	//links up to firebase and grabs all the users and stores it in the scope.users array
	var usersUrl = new Firebase("https://gamerscafe.firebaseio.com/gamerscafe/users");
	$scope.users = angularFireCollection(usersUrl);
	
	
	var userRef = new Firebase("https://gamerscafe.firebaseio.com/");
	//uses facebook login to grab the user info and prepopulate all the fields
	var authenticate = new FirebaseSimpleLogin(userRef, function(error, user) {
		if (user) {
			console.log(user);
			//generates a url to get the image based on their unique username
			var picurl = "http://graph.facebook.com/" + user.username + "/picture?type=large";
			
			var userExists = false;
			for (var i = 0, max = $scope.users.length; i<max; i++) {
				if ($scope.users[i].email != user.email) {
					userExists = false;
				} else {
					userExists = true;
					break;
				}
			}
			if (userExists) {
				console.log("user email exists");
			} else {
				console.log("user email does not exist");
				//creates a user object from all of the fields and pushes it to the firebase table
				$scope.users.add({"displayName": user.name, "email": user.email, "profilePic": picurl, "facebook": true});
			}
			
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
		var userExists = false;
		for (var i = 0, max = $scope.users.length; i<max; i++) {
			if ($scope.users[i].email != $scope.user.email) {
				userExists = false;
			} else {
				userExists = true;
				break;
			}
		}
		if (userExists) {
			console.log("userExists");
		} else {
			console.log("user does not exist");
			//creates a user object from all of the fields and pushes it to the firebase table
			$scope.users.add({"displayName": $scope.user.name,"facebook": false, "email": $scope.user.email, "password": $scope.user.password});
		}	
	
		$scope.fullname = "";
		$scope.password = "";
		$scope.email = ""; 
	};

}



