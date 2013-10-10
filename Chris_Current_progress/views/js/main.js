var gamerscafe = angular.module('gamerscafe', ['firebase']);

gamerscafe.run(['angularFireAuth', '$rootScope', function(angularFireAuth, $rootScope){
	var url = new Firebase("https://gamerscafe.firebaseio.com/");
	angularFireAuth.initialize(url, {name:'user', scope: $rootScope,callback: function(err, user) {
      
    }});
}]);

gamerscafe.controller('Core', ['$scope', 'angularFireCollection', 'angularFireAuth', function mtCtrl($scope, angularFireCollection, angularFireAuth){

	// Creates an instance of Firebase and connects to our URL
	var myConn 	= new Firebase('https://gamerscafe.firebaseio.com/gamerscafe');

	var auth = new FirebaseSimpleLogin(myConn, function(error, user) {});

	//************************************Games database***************************************************

	//url to the data needed
	var urlGames = new Firebase("https://gamerscafe.firebaseio.com/gamerscafe/games");

	//collects the info from the database for use.
	$scope.games = angularFireCollection(urlGames);

	//create a game and adds it to the database
	$scope.addGame = function(){
		$scope.games.add({title: "Halo 4", information: "blah blah", images: ["url1","url2"], system: "Xbox 360", genre: "Shooter"});
		console.log("addGame clicked");
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

	$scope.addStationToHistory = function(){
		$scope.stationHistory.add($scope.startTicket);
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

}]);

gamerscafe.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});


















