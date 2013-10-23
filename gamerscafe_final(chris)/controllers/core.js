gamerscafe.controller('Core', ['$scope', '$routeParams', '$location', 'angularFireCollection', 'angularFireAuth','angularFire','$timeout', function mtCtrl($scope, $routeParams, $location, angularFireCollection, angularFireAuth,angularFire,$timeout){

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
		game.title = "Gears of War 3";
		game.information = "This is an updated information";
		game.images = ["url3","url4"]
		game.system = "Xbox 360"; 
		game.genre = "Shooter";

		$scope.games.update(game);
	}

	//************************************Systems database***************************************************

	//url to the data needed
	var urlSystem = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/systems');

	//collects the info from the database for use.
	$scope.systems = angularFireCollection(urlSystem);

	//create a system and adds it to the database
	$scope.addSystem = function(){
		$scope.systems.add({name: "Xbox 360",station:"number here", model_number:"1234567890", purchased_date:"10/31/2013", info:"Blah Blah Blah"});
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
	$scope.users = angularFireCollection(urlUsers, function(snap)
	{
		var users = snap.val();
		if(typeof $routeParams !== "undefined"){
			if(typeof $routeParams.user !== "undefined"){
				$scope.tempUser =  $routeParams.user;
			}
		}
	});

	//************************************Stations CRUD***************************************************

	//urls to the data needed
	var urlStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/stations');

	//collects the info from the database for use.
	$scope.stations = angularFireCollection(urlStations);

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

	//************************************Station History CRUD***************************************************

	var urlStationHist = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/shistory');
	$scope.stationHistory = angularFireCollection(urlStationHist);

	$scope.addStationToHistory = function(historyStation){
		console.log("add history called");
		$scope.stationHistory.add(historyStation);
	}

	//************************************Staff CRUD***************************************************

	//url to the data needed
	var urlStaff = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/staff');

	//collects the info from the database for use.
	$scope.staff = angularFireCollection(urlStaff);

	//create a staff member and adds it to the staff database
	$scope.addStaff = function(){
		$scope.staff.add({email:"", password:""});

		auth.createUser(email, password, function(error, user) {
			if (!error) {
				console.log('User Id: ' + user.id + ', Email: ' + user.email);
			}
		});
	}

	//remove from the databse object but not from the auth list.
	$scope.deleteStaff = function(myid){
		$scope.staff.remove(myid);
		console.log("deleteStaff clicked");
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
		console.log(myid)
		$scope.quedStations.remove(myid);
		console.log("delete ActiveStations clicked");
	}

	//updates the quedStations database
	//have fields instead of string literal
	$scope.updateQuedStation = function(station){
		$scope.quedStations.update(station);
	}

	//************************************Active stations database***************************************************

	//url to the data needed
	var urlActiveStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/activeStations');

	var wrapper = function () {
    	updateTimer();
    	$timeout(wrapper, 30000);
	}

	//collects the info from the database for use.
	$scope.activeStations = angularFireCollection(urlActiveStations,function()
		{
			//starts the clocks
			$timeout(wrapper);
		});

	if(typeof $routeParams !== "undefined"){
		if(typeof $routeParams.stationId !== "undefined"){
			$scope.tempStation = {};
			angularFire(urlActiveStations.child($routeParams.stationId),$scope,'tempStation');
			$scope.tempStation.id = $routeParams.stationId;
			
		}
	}

	var updateTimer = function(){
		//runs a loop for each station on the active stations database
		for (var i = $scope.activeStations.length - 1; i >= 0; i--) {
			//checks to see if the timer is 0 and will change the status from nomral to red.
			//sets the minutes to the new time
			var time = new Date().getTime() - $scope.activeStations[i].startTime;
			$scope.activeStations[i].displayTime = parseInt($scope.activeStations[i].countdown - (time/1000/60));
			console.log('$scope.activeStations[i].displayTime',$scope.activeStations[i].displayTime);

			if($scope.activeStations[i].displayTime <= 0){
				console.log("Time is up on Station " + $scope.activeStations[i].stationNumber);
				console.log("the countdown is at " + $scope.activeStations[i].countdown);
				$scope.activeStations[i].displayTime = 0;
			}
		};
	};

	

	//create a active station and adds it to the database
	$scope.addActiveStation = function(){

		var updateStationItem = {};
		updateStationItem.stationNumber = document.querySelector("#customDropdown").value;
        updateStationItem.boxart = document.querySelector("#games_option").value;
        updateStationItem.username = document.querySelector("#username").value;
        updateStationItem.countdown = document.querySelector("#time_dropdown").value;

		$scope.activeStations.add({
			stationNumber:updateStationItem.stationNumber, 
			username:updateStationItem.username, 
			boxart:"views/img/gtav.jpg", 
			countdown: updateStationItem.countdown, 
			startTime: new Date().getTime()
		});
		$location.path("/admin");

		if(typeof $routeParams.user !== "undefined"){
			if(typeof $routeParams.stationId !== "undefined"){
				$scope.deleteQuedStation($routeParams.stationId);
			}
		}

		console.log("add ActiveStations clicked");
	}

	//removes activeStations based on a unique id
	$scope.deleteActiveStation = function(removeStation){
			$scope.stationHistory.add($scope.tempHistStation);
			$scope.tempStation = null;
			$location.path("/admin");
	}

	//updates the activeStations database
	$scope.updateActiveStation = function(){
		console.log('urlActiveStations',urlActiveStations)
		if(typeof $scope.activeStations == "undefined"){
			$scope.activeStations = angularFireCollection(urlActiveStations,function(snap){
				var stations = snap.val();
				if(typeof $routeParams !== "undefined"){
					$scope.tempStation.stationNumber = document.querySelector("#customDropdown").value;
			        $scope.tempStation.boxart = "views/images/watchdog.jpg";
			        $scope.tempStation.username = document.querySelector("#username").value;;
			        $scope.tempStation.countdown = parseFloat($scope.tempStation.countdown) + parseFloat(document.querySelector("#time_dropdown").value);
			        $location.path("/admin");
				}
			})
		}else{
			$scope.tempStation.stationNumber = document.querySelector("#customDropdown").value;
	        $scope.tempStation.boxart = "views/images/watchdog.jpg";
	        $scope.tempStation.username = document.querySelector("#username").value;;
	        $scope.tempStation.countdown = parseFloat($scope.tempStation.countdown) + parseFloat(document.querySelector("#time_dropdown").value);
	        $location.path("/admin");
		}
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











