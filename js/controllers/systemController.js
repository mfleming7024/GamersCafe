gamerscafe.controller('SystemCrud', ['$scope', '$routeParams', '$location', 'angularFireCollection', 'angularFireAuth','angularFire','$timeout', function mtCtrl($scope, $routeParams, $location, angularFireCollection, angularFireAuth,angularFire,$timeout){

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
            if ($scope.system.systemName == "" || $scope.system.systemName == null) { //System Name
                console.log("No System Name Given");
            } else if ($scope.system.systemSerial == "" || $scope.system.systemSerial == null) { //System Serial
                console.log("No System Serial Given");
            } else if ($scope.system.systemStation == "" || $scope.system.systemStation == null) { //Systems Assigned Station
                console.log("Please select a station or None");
            } else {
                $scope.systems.add($scope.system); // Add to Firebase
                $location.path('/admin_systems');
            }
        }
    }

//get systemId
    var theSystemId;
//System info page
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.systemId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlSystem.child($routeParams.systemId),$scope,'system_profile');
            theSystemId = $routeParams.systemId;
        }
    }

//removes system based on a unique id
    var system_delete_confirmed = false;
    $scope.deleteSystem = function(myid){
        if (system_delete_confirmed) {
            $scope.systems.remove(theSystemId); //Removes from firebase
            $location.path('/admin_systems');
            $("#system_delete_button").css("background", "#2ba6cb").html("Delete"); //Click to delete
            system_delete_confirmed = false;
        } else {
            $("#system_delete_button").css("background", "red").html("Are you sure"); //Confirm Delete
            system_delete_confirmed = true;
        }
    }

//updates the systems database have fields instead of string literal
    var system_update_confirmed = false;
    $scope.updateSystem = function(system){
        if (system_update_confirmed) {
            //Grabs the game properties from the scope to pass into the game object and update it
            var tempSystemName = document.querySelector("#tempSystemName").value;
            var tempSystemSerial = document.querySelector("#tempSystemSerial").value;
            var tempSystemStation = document.querySelector("#tempSystemStation").value;

            //Sets the game properties equal to whatever value is in the text inputs
            $scope.system_profile.systemName = tempSystemName;
            $scope.system_profile.systemSerial = tempSystemSerial;
            $scope.system_profile.systemStation = tempSystemStation;

            //visual of game update
            $location.path('/admin_systems'); //Updates Firebase
            $scope.systems.update(system);

            $("#system_update_button").css("background", "#2ba6cb").html("Update");
            system_update_confirmed = false;
        } else {
            $("#system_update_button").css("background", "green").html("Are you sure");
            system_update_confirmed = true;
        }
    }

}])