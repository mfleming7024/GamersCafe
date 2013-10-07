var gamerscafe = angular.module('gamerscafe', ['firebase']);

gamerscafe.run(['angularFireAuth', function(angularFireAuth){
	var url = "https://gamerscafe.firebaseio.com/";
	angularFireAuth.initialize(url, {'name':'user', 'path':'/'});
}]);

gamerscafe.controller('Core', ['$scope', 'angularFireCollection', 'angularFireAuth', function mtCtrl($scope, angularFireCollection, angularFireAuth){

	// Creates an instance of Firebase and connects to our URL
	var myConn 	= new Firebase('https://gamerscafe.firebaseio.com/gamerscafe');

	//************************************Games***************************************************

	//url to the data needed
	var urlGames = 'https://gamerscafe.firebaseio.com/gamerscafe/games';

	//collects the info from the database for use.
	$scope.games = angularFireCollection(urlGames, $scope, 'games', []);

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

	//************************************Systems***************************************************

	//url to the data needed
	var urlSystem = 'https://gamerscafe.firebaseio.com/gamerscafe/systems';

	//collects the info from the database for use.
	$scope.systems = angularFireCollection(urlSystem, $scope, 'systems', []);

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
		system.station:"here number";
		system.model_number:"0987654321"; 
		system.purchased_date:"10/30/2013"; 
		system.info:"updated Blah";
		$scope.systems.update(system);
	}

}])