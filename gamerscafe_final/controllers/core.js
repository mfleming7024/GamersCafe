
gamerscafe.controller('Core', ['$scope', '$routeParams','$location', 'angularFireCollection', 'angularFireAuth', function mtCtrl($scope, $routeParams, $location, angularFireCollection, angularFireAuth){


    // Creates an instance of Firebase and connects to our URL
    var myConn 	= new Firebase('https://gamerscafe.firebaseio.com/gamerscafe');
    var auth = new FirebaseSimpleLogin(myConn, function(error, user) {});

    $scope.test = function(){
        console.log("Test working.")
    }

    //************************************Games CRUD***************************************************

    //url to the data needed
    var urlGames = new Firebase("https://gamerscafe.firebaseio.com/gamerscafe/games");

    //collects the info from the database for use.
    $scope.games = angularFireCollection(urlGames);

    //create a game and adds it to the database
    $scope.addGame = function(){
        //$scope.games.add({title: "Halo 4", information: "blah blah", images: ["url1","url2"], system: "Xbox 360", genre: "Shooter"});
        if ($scope.game == "" || $scope.game == null) {
            console.log("game does not exist");
        } else {
            //error checking for if fields are null
            if ($scope.game.gameSystem == "" || $scope.game.gameSystem == null) {
                console.log("No game system given");
            } else if ($scope.game.gameTitle == "" || $scope.game.gameTitle == null) {
                console.log("No game name given");
            } else if ($scope.game.gameArtUrl == "" || $scope.game.gameArtUrl == null) {
                console.log("No game art url given");
            } else if ($scope.game.gameQuantity == "" || $scope.game.gameQuantity == null) {
                console.log("No game quantity given");
            } else {
                console.log($scope.game);
                $scope.games.add($scope.game);
            }
        }
    }

    var game_delete_confirmed = false;
    //removes game based on a unique id
    $scope.deleteGame = function(myid){
<<<<<<< HEAD
        if (game_delete_confirmed) {

            $("#game_delete_button" + myid).css("background", "#2ba6cb").html("Delete");

            $scope.games.remove(myid);
            console.log("deleteGame clicked");

            game_delete_confirmed = false;
        } else {
            $("#game_delete_button" + myid).css("background", "red").html("Are you sure");

            game_delete_confirmed = true;
        }

=======
    	if (game_delete_confirmed) {
    		//Changes appearance of button to ask for confirmation
    		$("#game_delete_button" + myid).css("background", "#2ba6cb").html("Delete");
	    	$scope.games.remove(myid);
	    	console.log("deleteGame clicked", myid); 	
	    	//resets boolean on delete
	    	game_delete_confirmed = false;
    	} else {
    		//changes html and color to reflect a confirmation
	    	$("#game_delete_button" + myid).css("background", "red").html("Are you sure");
	    	game_delete_confirmed = true;
    	}
        
>>>>>>> eca2e7f77f4e071e6ccbb44062828480094f50f8
    }

    var game_update_confirmed = false;
    //updates the games database have fields instead of string literal
    $scope.updateGame = function(game){
        if (game_update_confirmed) {

            //Grabs the game properties from the scope to pass into the game object and update it
            var tempGameTitle = document.querySelector("#tempGameTitle" + game.$id).value;
            var tempGameSystem = document.querySelector("#tempGameSystem" + game.$id).value;
            var tempGameQuantity = document.querySelector("#tempGameQuantity" + game.$id).value;

            //Sets the game properties equal to whatever value is in the text inputs
            game.gameTitle = tempGameTitle;
            game.gameSystem = tempGameSystem;
            game.gameQuantity = tempGameQuantity;

            //visual of game update
            console.log("game updated", game);
            $scope.games.update(game);

            $("#game_update_button" + game.$id).css("background", "#2ba6cb").html("Update");
            game_update_confirmed = false;
        } else {
            $("#game_update_button" + game.$id).css("background", "green").html("Are you sure");
            game_update_confirmed = true;
        }
    }

    //************************************Systems CRUD***************************************************
    //url to the data needed
    var urlSystem = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/systems');

    //collects the info from the database for use.
    $scope.systems = angularFireCollection(urlSystem);

    //create a system and adds it to the database
    $scope.addSystem = function(){
        if ($scope.system == "" || $scope.system == null) {
            console.log("game does not exist");
        } else {
            if ($scope.system.systemName == "" || $scope.system.systemName == null) {
                console.log("No System Name Given");
            } else if ($scope.system.systemSerial == "" || $scope.system.systemSerial == null) {
                console.log("No System Serial Given");
            } else if ($scope.system.systemStation == "" || $scope.system.systemStation == null) {
                console.log("Please select a station or None");
            } else {
                console.log($scope.system);
                $scope.systems.add($scope.system);
            }
        }
        console.log("addSystem clicked");
    }

    var system_delete_confirmed = false;
    //removes system based on a unique id
    $scope.deleteSystem = function(myid){
        if (system_delete_confirmed) {
            $scope.systems.remove(myid);
            console.log("deleteSystem clicked");
            $("#system_delete_button" + myid).css("background", "#2ba6cb").html("Delete");
            system_delete_confirmed = false;
        } else {
            $("#system_delete_button" + myid).css("background", "red").html("Are you sure");
            system_delete_confirmed = true;
        }
    }

    var system_update_confirmed = false;
    //updates the systems database have fields instead of string literal
    $scope.updateSystem = function(system){

        if (system_update_confirmed) {
            //Grabs the game properties from the scope to pass into the game object and update it
            var tempSystemName = document.querySelector("#tempSystemName" + system.$id).value;
            var tempSystemSerial = document.querySelector("#tempSystemSerial" + system.$id).value;
            var tempSystemStation = document.querySelector("#tempSystemStation" + system.$id).value;

            //Sets the game properties equal to whatever value is in the text inputs
            system.systemName = tempSystemName;
            system.systemSerial = tempSystemSerial;
            system.systemStation = tempSystemStation;

            //visual of game update
            console.log("system updated", system);
            $scope.systems.update(system);

            $("#system_update_button" + system.$id).css("background", "#2ba6cb").html("Update");
            system_update_confirmed = false;
        } else {
            $("#system_update_button" + system.$id).css("background", "green").html("Are you sure");
            system_update_confirmed = true;
        }


    }

    //************************************Users CRUD***************************************************

    //url to the data needed
    var urlUsers = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/users');

    //collects the info from the database for use.
    $scope.users = angularFireCollection(urlUsers, function(snap){
        var users = snap.val();
        if(typeof $routeParams !== "undefined"){
            if(typeof $routeParams.user !== "undefined"){
                $scope.tempUser =  $routeParams.user;
            }
        }
    });
	
	var user_delete_confirmed = false;
	$scope.deleteUser = function(itemId){
		if (user_delete_confirmed) {
			$scope.users.remove(itemId);
			$("#user_delete_button" + itemId).css("background", "#2ba6cb").html("Delete");
			user_delete_confirmed = false;
		} else {
			$("#user_delete_button" + itemId).css("background", "red").html("Are you sure");
			user_delete_confirmed = true;
		}
	}
	
	var user_update_confirmed = false;
	$scope.updateUser = function(user) {
		if (user_update_confirmed) {
			$("#user_update_button" + user.$id).css("background", "#2ba6cb").html("Update");
			user_update_confirmed = false;
			
			//sets variables for all of the input field values
			var tempUserName = document.querySelector("#tempUserName" + user.$id).value;
	        var tempUserEmail = document.querySelector("#tempUserEmail" + user.$id).value;
	        var tempUserJoinDate = document.querySelector("#tempUserJoinDate" + user.$id).value;
	
	        //Sets the station properties equal to whatever value is in the text inputs
	        user.displayName = tempUserName;
	        user.email = tempUserEmail;
	        user.joinedOn = tempUserJoinDate;
	
	        //visual of station update
	        console.log("user updated", user);
	        $scope.users.update(user);
		} else {
			$("#user_update_button" + user.$id).css("background", "green").html("Are you sure");
			user_update_confirmed = true;
		}
	}

    //************************************Stations CRUD***************************************************

    //urls to the data needed
    var urlStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/stations');
    var urlStationHist = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/shistory');

    //collects the info from the database for use.
    $scope.stations = angularFireCollection(urlStations);
    $scope.stationHistory = angularFireCollection(urlStationHist);

    //create a system and adds it to the database
    $scope.addStation = function(){
        if ($scope.station == "" || $scope.station == null) {
            console.log("Station does not exist");
        } else {
            if ($scope.station.stationNumber == "" || $scope.station.stationNumber == null) {
                console.log("No Station Chosen");
            } else if ($scope.station.stationSystem == "" || $scope.station.stationSystem == null) {
                console.log("Select A System");
            } else if ($scope.station.stationTV == "" || $scope.station.stationTV == null) {
                console.log("Please enter a TV");
            } else if ($scope.station.stationTVSerial == "" || $scope.station.stationTVSerial == null) {
                console.log("Please enter a TV Serial");
            } else {
                console.log($scope.station);
                $scope.stations.add($scope.station);
            }
        }
        console.log("addStation clicked");
    }

    //removes system based on a unique id
    $scope.deleteStation = function(myid){
        $scope.stations.remove(myid);
        console.log("deleteStation clicked");
    }


    //updates the station database have fields instead of string literal
    $scope.updateStation = function(station){
        //Grabs the station properties from the scope to pass into the station object and update it
        var tempStationNumber = document.querySelector("#tempStationNumber" + station.$id).value;
        var tempStationSystem = document.querySelector("#tempStationSystem" + station.$id).value;
        var tempStationTV = document.querySelector("#tempStationTV" + station.$id).value;
        var tempStationTVSerial = document.querySelector("#tempStationTVSerial" + station.$id).value;

        //Sets the station properties equal to whatever value is in the text inputs
        station.stationNumber = tempStationNumber;
        station.stationSystem = tempStationSystem;
        station.stationTV = tempStationTV;
        station.stationTVSerial = tempStationTVSerial;

        //visual of station update
        console.log("station updated", station);
        $scope.stations.update(station);
    }

    //$scope.tempStation = $scope.$routeParams.stationID;
    //console.log(tempStation);

    $scope.addStationToHistory = function(){
        $scope.stationHistory.add($scope.startTicket);
    }

    //************************************Staff CRUD***************************************************

    //url to the data needed
    var urlStaff = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/staff');

    //collects the info from the database for use.
    $scope.staffs = angularFireCollection(urlStaff);

    //create a staff member and adds it to the staff database
    $scope.addStaff = function(){
        if ($scope.staff == "" || $scope.staff == null) {
            console.log("staff does not exist");
        } else {
            if ($scope.staff.staffName == "" || $scope.staff.staffName == null) {
                console.log("No Staff Name Given");
            } else if ($scope.staff.staffNumber == "" || $scope.staff.staffNumber == null) {
                console.log("No Number Given");
            } else if ($scope.staff.staffEmail == "" || $scope.staff.staffEmail == null) {
                console.log("Please Enter an Email");
            } else if ($scope.staff.staffPassword == "" || $scope.staff.staffPassword == null) {
                console.log("Please Enter A Password");
            } else if ($scope.staff.staffPermission == "" || $scope.staff.staffPermission == null) {
                console.log("Please select a permission");
            } else {
                console.log($scope.staff);
                $scope.staffs.add($scope.staff);
                $location.path('/admin_staff');
            }
        }
        console.log("addStaff clicked");

        auth.createUser(email, password, function(error, user) {
            if (!error) {
                console.log('User Id: ' + user.id + ', Email: ' + user.email);
            }
        });
    }


    var staff_update_confirmed = false;
    //updates the staff database have fields instead of string literal
    $scope.updateStaff = function(staff){
        if (staff_update_confirmed) {
            //Grabs the staff properties from the scope to pass into the staff object and update it
            var tempStaffName = document.querySelector("#tempStaffName" + staff.$id).value;
            var tempStaffNumber = document.querySelector("#tempStaffNumber" + staff.$id).value;
            var tempStaffEmail = document.querySelector("#tempStaffEmail" + staff.$id).value;
            var tempStaffPassword = document.querySelector("#tempStaffPassword" + staff.$id).value;

            //Sets the staff properties equal to whatever value is in the text inputs
            staff.staffName = tempStaffName;
            staff.staffNumber = tempStaffNumber;
            staff.staffEmail = tempStaffEmail;
            staff.staffPassword = tempStaffPassword;

            //visual of staff update
            console.log("staff updated", staff);
            $scope.staffs.update(staff);

            $("#staff_update_button" + staff.$id).css("background", "#2ba6cb").html("Update");
            staff_update_confirmed = false;
        } else {
            $("#staff_update_button" + staff.$id).css("background", "green").html("Are you sure");
            staff_update_confirmed = true;
        }
    }

    var staff_delete_confirmed = false;
    //remove from the databse object but not from the auth list.
    $scope.deleteStaff = function(myid){
        if (staff_delete_confirmed){
            $scope.staffs.remove(myid);
            console.log("deleteStaff clicked");

            $("#staff_delete_button" + myid).css("background", "#2ba6cb").html("Delete");
            staff_delete_confirmed = false;
        } else {
            $("#staff_delete_button" + myid).css("background", "red").html("Are you sure");
            staff_delete_confirmed = true;
        }
    }

    //************************************Active stations database***************************************************

    //url to the data needed
    var urlActiveStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/activeStations');

    //collects the info from the database for use.
    $scope.activeStations = angularFireCollection(urlActiveStations,function(snap)
    {
        var stations = snap.val();
        if(typeof $routeParams !== "undefined"){
            if(typeof $routeParams.stationId !== "undefined"){
                console.log("routeParams child"+$routeParams);
                $scope.tempStation =  stations[$routeParams.stationId];
                $scope.tempStation.$id = $routeParams.stationId;
            }
        }
    });

    //create a active station and adds it to the database
    $scope.addActiveStation = function(){
        console.log(document.getElementById("#tempStationNumber"));
        var updateStationItem = {};
        updateStationItem.stationNumber = document.getElementById("#tempStationNumber").text;
        updateStationItem.boxart = document.getElementById("#tempStationBoxart").text;
        updateStationItem.username = document.getElementById("#tempStationUsername").text;
        updateStationItem.countdownMin = parseInt(updateStationItem.countdownMin) + parseInt(document.getElementById("#tempStationAddTime").text);
        // $scope.activeStations.add();
        console.log("add ActiveStations clicked");
    }

    //removes activeStations based on a unique id
    $scope.deleteActiveStation = function(removeStation){
        if(typeof $scope.activeStations == "undefined"){
            $scope.activeStations = angularFireCollection(urlActiveStations,function(snap){
                var stations = snap.val();
                if(typeof $routeParams !== "undefined"){
                    $scope.tempStation =  stations[$routeParams.stationId];
                    $scope.tempStation.$id = $routeParams.stationId;
                }
                $scope.activeStations.remove($scope.tempStation.$id);
                $location.path("/admin");
            });
        }else{
            $scope.activeStations.remove($scope.tempStation.$id);
            $location.path("/admin");
        }
    }

    //updates the activeStations database
    $scope.updateActiveStation = function(stationToBeChanged){
        console.log("activeStations update called.");
        var updateStationItem = stationToBeChanged;
        //Grabs the station properties from the scope to pass into the station object and update it
        updateStationItem.stationNumber = document.querySelector("#tempStationNumber").value;
        updateStationItem.boxart = document.querySelector("#tempStationBoxart").value;
        updateStationItem.username = document.querySelector("#tempStationUsername").value;
        updateStationItem.countdownMin = parseInt(updateStationItem.countdownMin) + parseInt(document.querySelector("#tempStationAddTime").value);

        $scope.activeStations.update(updateStationItem);
    }

    //************************************Qued stations database***************************************************

    //url to the data needed
    var urlQuedStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/quedStations');

    //collects the info from the database for use.
    $scope.quedStations = angularFireCollection(urlQuedStations);

    //create a active station and adds it to the database
    $scope.addQuedStation = function(tempuser){

        var hours = new Date().getHours();
        var min =  new Date().getMinutes();
        if(parseInt(min) < 10){
            var time = hours+":0"+min;
        }else{
            var time = hours+":"+min;
        }

        $scope.quedStations.add({username:tempuser, currentTime:time});
        console.log("addQuedStations clicked");
        $location.path("/admin");
    }

    //removes quedStations based on a unique id
    $scope.deleteQuedStation = function(myid){
        $scope.quedStations.remove(myid);
        console.log("delete ActiveStations clicked");
    }

    //updates the quedStations database have fields instead of string literal
    $scope.updateQuedStation = function(station){
        $scope.quedStations.update(station);
    }

    //************************************Empty stations database***************************************************

    //url to the data needed
    var urlEmptyStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/emptyStations');

    //collects the info from the database for use.
    $scope.emptyStations = angularFireCollection(urlEmptyStations);

    //create a active station and adds it to the database
    $scope.addEmptyStation = function(){
        $scope.emptyStations.add({stationNumber: " "});
        console.log("add EmptyStations clicked");
    }

    //removes emptyStations based on a unique id
    $scope.deleteEmptyStation = function(myid){
        $scope.emptyStations.remove(myid);
        console.log("delete EmptyStations clicked");
    }

    //updates the emptyStations database have fields instead of string literal
    $scope.updateEmptyStation = function(station){
        $scope.emptyStations.update(station);
    }




    //********************************** USER LOGIN/SIGN UP ***********************************

//links up to firebase and grabs all the users and stores it in the scope.users array
    var usersUrl = new Firebase("https://gamerscafe.firebaseio.com/gamerscafe/users");
    $scope.users = angularFireCollection(usersUrl);


    var userRef = new Firebase("https://gamerscafe.firebaseio.com/");
//uses facebook login to grab the user info and prepopulate all the fields
    var authenticate = new FirebaseSimpleLogin(userRef, function(error, user) {
        if (user) {
            console.log(user);

            //generates a url to get the image based on their unique username

            var picurl = "http://graph.facebook.com/" + user.username + "/picture?type=small";
            var displayName = user.displayName;

            console.log(displayName);
            $('#profilePic').attr('src', picurl);
            $('#displayName').text(displayName);
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
                $location.path('/admin_staff');

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
        console.log('test');
    };



}]);

gamerscafe.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++)
            input.push(i);
        return input;
    };
});













