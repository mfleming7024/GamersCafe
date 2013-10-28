gamerscafe.controller('GameCrud', ['$scope', '$routeParams', '$location', 'angularFireCollection', 'angularFireAuth','angularFire','$timeout', function mtCtrl($scope, $routeParams, $location, angularFireCollection, angularFireAuth,angularFire,$timeout){

//************************************Games CRUD***************************************************

    //url to the data needed
    var urlGames = new Firebase("https://gamerscafe.firebaseio.com/gamerscafe/games");

    //collects the info from the database for use.
    $scope.games = angularFireCollection(urlGames);
    //create a game and adds it to the database
    $scope.addGame = function(){
        if ($scope.game == "" || $scope.game == null) {
            console.log("game does not exist");
        } else {
            //error checking for if fields are null
            if ($scope.game.gameSystem == "" || $scope.game.gameSystem == null) { //System
                console.log("No game system given");
            } else if ($scope.game.gameTitle == "" || $scope.game.gameTitle == null) { //Game Title
                console.log("No game name given");
            } else if ($scope.game.gameArtUrl == "" || $scope.game.gameArtUrl == null) { // Game Box Art
                console.log("No game art url given");
            } else if ($scope.game.gameQuantity == "" || $scope.game.gameQuantity == null) { //Quantity
                console.log("No game quantity given");
            } else {
                $scope.games.add($scope.game); //Adds to Firebase
                $location.path('/admin_games'); //redirects to Admin_Games
            }
        }
    }
    // get the current game id
    var theGameId;
    //Get the data from firebase on the click game.
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.gameId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlGames.child($routeParams.gameId),$scope,'game_profile');
            theGameId = $routeParams.gameId;
        }
    }

    //Confirm Delete for Games
    var game_delete_confirmed = false;
    $scope.deleteGame = function(myid){
        if (game_delete_confirmed) {
            $("#game_delete_button").css("background", "#2ba6cb").html("Delete"); //Click to delete
            $scope.games.remove(theGameId); // Deletes the game with the GameId
            $location.path('/admin_games');

        } else {
            $("#game_delete_button").css("background", "red").html("Are you sure"); //click to confirm delete
            game_delete_confirmed = true;
        }
    }
    $scope.boxArt = function(){
    }

    //updates the games database have fields instead of string literal
    var game_update_confirmed = false;
    $scope.updateGame = function(){
        if (game_update_confirmed) {

            //Grabs the game properties from the scope to pass into the game object and update it
            var tempGameArtUrl = document.querySelector("#tempGameArtUrl").value;
            var tempGameTitle = document.querySelector("#tempGameTitle").value;
            var tempGameSystem = document.querySelector("#tempGameSystem").value;
            var tempGameQuantity = document.querySelector("#tempGameQuantity").value;

            //Sets the game properties equal to whatever value is in the text inputs
            $scope.game_profile.gameArtUrl = tempGameArtUrl;
            $scope.game_profile.gameTitle = tempGameTitle;
            $scope.game_profile.gameSystem = tempGameSystem;
            $scope.game_profile.gameQuantity = tempGameQuantity;

            //visual of game update
            $location.path('/admin_games');
            $scope.games.update(); //Updates the Game on Firebase

            $("#game_update_button").css("background", "#2ba6cb").html("Update"); // Click this to Update
            game_update_confirmed = false;
        } else {
            $("#game_update_button").css("background", "green").html("Are you sure"); //Confirms if you wanna update
            game_update_confirmed = true;
        }
    }
}])