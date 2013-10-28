gamerscafe.controller('StationCrud', ['$scope', '$routeParams', '$location', 'angularFireCollection', 'angularFireAuth','angularFire','$timeout', function mtCtrl($scope, $routeParams, $location, angularFireCollection, angularFireAuth,angularFire,$timeout){
    //************************************Stations CRUD***************************************************

    //urls to the data needed
    var urlStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/stations'); //Stations Firebase
    var urlStationHist = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/shistory'); //History

    //collects the info from the database for use.
    $scope.stations = angularFireCollection(urlStations);
    $scope.stationHistory = angularFireCollection(urlStationHist);

    //create a system and adds it to the database
    $scope.addStation = function(){
        if ($scope.station == "" || $scope.station == null) {
            console.log("Station does not exist");
        } else {
            if ($scope.station.stationNumber == "" || $scope.station.stationNumber == null) { //Station Number
                console.log("No Station Chosen");
            } else if ($scope.station.stationSystem == "" || $scope.station.stationSystem == null) { // The Station System
                console.log("Select A System");
            } else if ($scope.station.stationTV == "" || $scope.station.stationTV == null) { //Station TV
                console.log("Please enter a TV");
            } else if ($scope.station.stationTVSerial == "" || $scope.station.stationTVSerial == null) { //TV's Serial
                console.log("Please enter a TV Serial");
            } else {
                $scope.stations.add($scope.station);
                $location.path('/admin_station');
            }
        }
    }

    //Get Station Id
    var theStationId;
    //Station info page
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.stationId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlStations.child($routeParams.stationId),$scope,'station_profile');

            theStationId = $routeParams.stationId;
        }
    }

    //removes system based on a unique id
    var station_delete_confirmed = false;
    $scope.deleteStation = function(myid){
        if(station_delete_confirmed) {
            $("#station_delete_button").css("background", "#2ba6cb").html("Delete");
            station_delete_confirmed = false;
            $scope.stations.remove(theStationId); //Removes from Firebase
            $location.path('/admin_station')
        } else {
            $("#station_delete_button").css("background", "red").html("Are you sure");
            station_delete_confirmed = true;
        }
    }

    var station_update_confirmed = false;
    //updates the station database have fields instead of string literal
    $scope.updateStation = function(station){
        if (station_update_confirmed) {
            //Grabs the station properties from the scope to pass into the station object and update it
            var tempStationNumber = document.querySelector("#tempStationNumber").value;
            var tempStationSystem = document.querySelector("#tempStationSystem").value;
            var tempStationTV = document.querySelector("#tempStationTV").value;
            var tempStationTVSerial = document.querySelector("#tempStationTVSerial").value;

            //Sets the station properties equal to whatever value is in the text inputs
            $scope.station_profile.stationNumber = tempStationNumber;
            $scope.station_profile.stationSystem = tempStationSystem;
            $scope.station_profile.stationTV = tempStationTV;
            $scope.station_profile.stationTVSerial = tempStationTVSerial;

            //visual of station update
            $location.path('/admin_station'); //Updates on firebase
            $scope.stations.update(station);

            $("#station_update_button").css("background", "#2ba6cb").html("Update");
            station_update_confirmed = false;
        } else {
            $("#station_update_button").css("background", "green").html("Are you sure");
            station_update_confirmed = true;
        }
    }

    $scope.addStationToHistory = function(){
        $scope.stationHistory.add($scope.startTicket);
    }
}])