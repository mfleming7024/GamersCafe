var gamerscafe = angular.module('gamerscafe', ['firebase']);

gamerscafe.run(['angularFireAuth', function(angularFireAuth){
	var url = "https://gamerscafe.firebaseio.com/";
	angularFireAuth.initialize(url, {'name':'user', 'path':'/'});
}]);

gamerscafe.controller('Core', ['$scope', 'angularFireCollection', 'angularFireAuth', function mtCtrl($scope, angularFireCollection, angularFireAuth){

	// Creates an instance of Firebase and connects to our URL
	var myConn 	= new Firebase('https://gamerscafe.firebaseio.com/gamerscafe');

	//************************************Games***************************************************

	var urlGames = 'https://gamerscafe.firebaseio.com/gamerscafe/games';

	$scope.games = angularFireCollection(urlGames, $scope, 'games', []);

	$scope.addGame = function(){
		$scope.games.add({title: "Halo 4", information: "blah blah", images: ["url1","url2"], system: "Xbox 360", genre: "Shooter"});
		console.log("addGame clicked");
	}

	$scope.deleteGame = function(myid){
		$scope.games.remove(myid);
		console.log("deleteGame clicked");
	}

	$scope.updateGame = function(){
	}

	//************************************Systems***************************************************

	var urlSystem = 'https://gamerscafe.firebaseio.com/gamerscafe/systems';

	$scope.systems = angularFireCollection(urlSystem, $scope, 'systems', []);

	$scope.addSystem = function(){
		$scope.systems.add({name: "Xbox 360"});
		console.log("addSystem clicked");
	}

	$scope.deleteSystem = function(myid){
		$scope.systems.remove(myid);
		console.log("deleteSystem clicked");
	}

	$scope.updateSystem = function(){
	}

}])