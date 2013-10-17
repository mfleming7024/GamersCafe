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
			
			//checks the database against what user email is passed in to see if it 
			//exists then sets a boolean to say so
			var userExists = true;
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
				//login the user
			} else {
				console.log("user email does not exist");
				//creates a user object from all of the fields and pushes it to the firebase table
				$scope.users.add({"displayName": user.name, "email": user.email, "profilePic": picurl, "facebook": true});
				//login the user
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
		//checks the database against what user email is passed in to see if it 
		//exists then sets a boolean to say so
		var userExists = false;
		for (var i = 0, max = $scope.users.length; i<max; i++) {
			if ($scope.users[i].email != $scope.user.email) {
				userExists = false;
			} else {
				userExists = true;
				break;
			}
		}
		//checks that boolean to determine appropriate user action
		//
		if (userExists) {
			console.log("user email exists");
		} else {
			console.log("user email does not exist");
			//creates a user object from all of the fields and pushes it to the firebase table
			$scope.users.add({"displayName": $scope.user.name,"facebook": false, "email": $scope.user.email, "password": $scope.user.password});
		}	
	
		//reset input fields
		$scope.fullname = "";
		$scope.password = "";
		$scope.email = ""; 
	};

}

function newsCtrl($scope, angularFireCollection) {
	var newsUrl = new Firebase("https://gamerscafe.firebaseio.com/gamerscafe/newsfeed");
	$scope.newsfeed = angularFireCollection(newsUrl);
	
	//add news items and read news items
	$scope.addNewsItem = function(){
		var currentdate = new Date();
		//trying to figure out a way to format the time
		$scope.post.postedOn = currentdate.getDay() + "/" + currentdate.getMonth() + "/" + currentdate.getFullYear() + " , " + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
		console.log($scope.post);
		//$scope.newsfeed.add($scope.post);
	}
	
	//removes a news item from the database using its unique id
	$scope.removeNewsItem = function(postId){
		$scope.newsfeed.remove(postId);
	}
	
	//passes in the post object to be manipulated then updated
	$scope.updateNewsItem = function(post) {
		post.title = "New Title!!!!";
		$scope.newsfeed.update(post.$id);
	}
}

function userCtrl($scope, angularFireCollection) {
	//grabs everything from users table on firebase and passes into scope under "users"
	var usersUrl = new Firebase("https://gamerscafe.firebaseio.com/gamerscafe/users");
	$scope.users = angularFireCollection(usersUrl);
	
	$scope.deleteUser = function(itemId){
		//removes user from firebase
		$scope.users.remove(itemId);
	}
	
	$scope.updateUser = function(user) {
		//changes users fullname then updates in firebase
		user.displayName = "My new fullname lol";
		$scope.users.update(user.$id);
	}
}

//Bar graph testing
var graphCanvas = document.getElementById('barGraph');
// Check that the element is available within the DOM (IE fail...)
if (graphCanvas.getContext) {
// Opens a 2D drawing context within the canvas
var context = graphCanvas.getContext('2d');

// Bar chart data (JSON Format)
var data = [{name: "Grand Theft Auto V", timesPlayed: "50"}, {name: "Halo 4", timesPlayed: "122"}, {name: "World of Warcraft", timesPlayed: "300"}, {name: "League of Legends", timesPlayed: "450"}, {name: "Call of Duty : Ghosts", timesPlayed: "50"},{name: "Super Smash Brothers", timesPlayed: "480"}, {name: "Battlefield 4", timesPlayed: "27"}];

// Draw the bar chart
drawChart(context, data);

//Still a work in progress 
function drawChart(context, data) {
	var xpos = 5;
	
	
/*
			console.log("prop = " + prop);
			console.log("obj[prop] = " + obj[prop]);
*/

	
	context.strokeStyle = "#000000";
	context.fillStyle = "#FFFF00";
	
	context.lineWidth=1;
	context.font="18px sans-serif";
	context.fillText("Fill Text", xpos, 20);
	
	for (var key in data) {
		var obj = data[key];
		context.beginPath();
		context.rect(xpos, graphCanvas.height - obj["timesPlayed"], 30, obj["timesPlayed"]);
		context.closePath();
		context.stroke();
		context.fill();
		xpos += 70;
	}
}
}













