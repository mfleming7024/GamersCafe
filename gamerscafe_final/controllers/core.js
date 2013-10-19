gamerscafe.controller('Core', ['$scope', '$routeParams', 'angularFireCollection', 'angularFireAuth', function mtCtrl($scope, $routeParams, angularFireCollection, angularFireAuth){

    // Creates an instance of Firebase and connects to our URL
    var myConn 	= new Firebase('https://gamerscafe.firebaseio.com/gamerscafe');
    var auth = new FirebaseSimpleLogin(myConn, function(error, user) {});

    $scope.test = function(){
        console.log("Test working.")
    }

    //************************************Games database***************************************************

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

    //removes game based on a unique id
    $scope.deleteGame = function(myid){
        $scope.games.remove(myid);
        console.log("deleteGame clicked");
    }

    //updates the games database
	//have fields instead of string literal
	$scope.updateGame = function(game){
		//Grabs the game properties from the scope to pass into the game object and update it
		var tempGameTitle = document.querySelector("#tempGameTitle").value;
		var tempGameSystem = document.querySelector("#tempGameSystem").value;
		var tempGameQuantity = document.querySelector("#tempGameQuantity").value;
		
		//Sets the game properties equal to whatever value is in the text inputs
		game.gameTitle = tempGameTitle;
		game.gameSystem = tempGameSystem; 
		game.gameQuantity = tempGameQuantity;
		
		//visual of game update
		console.log("game updated", game);
		$scope.games.update(game);
	}

    //************************************Systems database***************************************************
//url to the data needed
    var urlSystem = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/systems');

    //collects the info from the database for use.
    $scope.systems = angularFireCollection(urlSystem);

    //create a system and adds it to the database
    $scope.addSystem = function(){
//		$scope.systems.add({name: "Xbox 360",station:"number here", model_number:"1234567890", purchased_date:"10/31/2013", info:"Blah Blah Blah"});
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

    //removes system based on a unique id
    $scope.deleteSystem = function(myid){
        $scope.systems.remove(myid);
        console.log("deleteSystem clicked");
    }

    //updates the systems database
    //have fields instead of string literal
    $scope.updateSystem = function(system){
        system.name = "PS3";
        system.station = "9999";
        system.model_number = "0987654321";
        system.purchased_date = "10/30/2013";
        system.info = "updated Blah";
        $scope.systems.update(system);
    }

    //************************************Users database***************************************************

    //url to the data needed
    var urlUsers = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/users');

    //collects the info from the database for use.
    $scope.users = angularFireCollection(urlUsers, $scope, 'users', []);

    //************************************Stations CRUD***************************************************

    //urls to the data needed
    var urlStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/stations');
    var urlStationHist = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/shistory');

    //collects the info from the database for use.
    $scope.stations = angularFireCollection(urlStations);
    $scope.stationHistory = angularFireCollection(urlStationHist);

    //create a system and adds it to the database
    $scope.addStation = function(){
        $scope.stations.add({number: "1", system: "Xbox One"});
        console.log("addStation clicked");
    }

    //removes system based on a unique id
    $scope.deleteStation = function(myid){
        $scope.stations.remove(myid);
        console.log("deleteStation clicked");
    }


    $scope.updateStation = function(stations){
        station.number = "number here";
        station.system = "system here";

        $scope.games.update(game);
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
//		$scope.staff.add({email:"", password:""});
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
            }
        }
        console.log("addStaff clicked");

        auth.createUser(email, password, function(error, user) {
            if (!error) {
                console.log('User Id: ' + user.id + ', Email: ' + user.email);
            }
        });
    }

    //remove from the databse object but not from the auth list.
    $scope.deleteStaff = function(myid){
        $scope.staffs.remove(myid);
        console.log("deleteStaff clicked");
    }

    //************************************Active stations database***************************************************

   //url to the data needed
   var urlActiveStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/activeStations');

   //collects the info from the database for use.
   $scope.activeStations = angularFireCollection(urlActiveStations,function(snap)
   {
       var stations = snap.val();
       if(typeof $routeParams !== "undefined"){
           $scope.tempStation =  stations[$routeParams.stationId];
       }
   });

   //create a active station and adds it to the database
   $scope.addActiveStation = function(){
       $scope.activeStations.add({stationNumber: "1", userPic:"http://graph.facebook.com/chris.henry/picture?type=small", username:"Laothud", boxart:"views/images/gtav.jpg", currentTime:time, countdownHours:"24", countdownMin: "00", quedName:"None", quedTime:"00:00"});
       console.log("add ActiveStations clicked");
   }

   //removes activeStations based on a unique id
   $scope.deleteActiveStation = function(myid){
       $scope.activeStations.remove(myid);
       console.log("delete ActiveStations clicked");
   }

   //updates the activeStations database
   //have fields instead of string literal
   $scope.updateActiveStation = function(station){
       $scope.activeStations.update(station);
   }



    //************************************Qued stations database***************************************************

    //url to the data needed
    var urlQuedStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/quedStations');

    //collects the info from the database for use.
    $scope.quedStations = angularFireCollection(urlQuedStations);

    //create a active station and adds it to the database
    $scope.addQuedStation = function(){
        $scope.quedStations.add({stationNumber: "5", userPic:"http://graph.facebook.com/chris.henry/picture?type=small", username:"Laothud", boxart:"views/images/gtav.jpg", currentTime:time, countdownHours:"24", countdownMin: "00", quedName:"None", quedTime:"00:00"});
        console.log("add ActiveStations clicked");
    }

    //removes quedStations based on a unique id
    $scope.deleteQuedStation = function(myid){
        $scope.quedStations.remove(myid);
        console.log("delete ActiveStations clicked");
    }

    //updates the quedStations database
    //have fields instead of string literal
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
        $scope.emptyStations.add({stationNumber: "11"});
        console.log("add EmptyStations clicked");
    }

    //removes emptyStations based on a unique id
    $scope.deleteEmptyStation = function(myid){
        $scope.emptyStations.remove(myid);
        console.log("delete EmptyStations clicked");
    }

    //updates the emptyStations database
    //have fields instead of string literal
    $scope.updateEmptyStation = function(station){
        $scope.emptyStations.update(station);
    }




}]);

gamerscafe.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++)
            input.push(i);
        return input;
    };
});












