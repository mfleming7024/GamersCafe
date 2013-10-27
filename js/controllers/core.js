gamerscafe.controller('Core', ['$scope', '$routeParams', '$location', 'angularFireCollection', 'angularFireAuth','angularFire','$timeout', function mtCtrl($scope, $routeParams, $location, angularFireCollection, angularFireAuth,angularFire,$timeout){

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
                $location.path('/admin_games');
            }
        }
    }
    var theGameId;
    //Games info page
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.gameId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlGames.child($routeParams.gameId),$scope,'game_profile');

            theGameId = $routeParams.gameId;
        }
    }

    var game_delete_confirmed = false;

    $scope.deleteGame = function(myid){
        if (game_delete_confirmed) {
            $("#game_delete_button").css("background", "#2ba6cb").html("Delete");
            $scope.games.remove(theGameId);
            console.log("deleteGame clicked");
            $location.path('/admin_games');

        } else {
            $("#game_delete_button").css("background", "red").html("Are you sure");
            game_delete_confirmed = true;
            console.log("confirm");
        }
    }
    $scope.boxArt = function(){

    }
    var game_update_confirmed = false;
    //updates the games database have fields instead of string literal

    $scope.updateGame = function(game){
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
            console.log("game updated");
            $scope.games.update();

            $("#game_update_button").css("background", "#2ba6cb").html("Update");

            game_update_confirmed = false;
        } else {
            console.log('clicked')
            $("#game_update_button").css("background", "green").html("Are you sure");
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
                $location.path('/admin_systems');
            }
        }
        console.log("addSystem clicked");
    }

    var theSystemId;
    //System info page
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.systemId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlSystem.child($routeParams.systemId),$scope,'system_profile');

            theSystemId = $routeParams.systemId;
        }
    }

    var system_delete_confirmed = false;
    //removes system based on a unique id
    $scope.deleteSystem = function(myid){
        if (system_delete_confirmed) {
            $scope.systems.remove(theSystemId);
            $location.path('/admin_systems');
            console.log("deleteSystem clicked");
            $("#system_delete_button").css("background", "#2ba6cb").html("Delete");
            system_delete_confirmed = false;
        } else {
            $("#system_delete_button").css("background", "red").html("Are you sure");
            system_delete_confirmed = true;
        }
    }

    var system_update_confirmed = false;
    //updates the systems database have fields instead of string literal
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
            $location.path('/admin_systems');
            console.log("system updated", system);
            $scope.systems.update(system);

            $("#system_update_button").css("background", "#2ba6cb").html("Update");
            system_update_confirmed = false;
        } else {
            $("#system_update_button").css("background", "green").html("Are you sure");
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
                $scope.tempUsers =  $routeParams.stationId;
            }
        }
    });

    var theUserId;
    //Users info page
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.userId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlUsers.child($routeParams.userId),$scope,'user_profile');

            theUserId = $routeParams.userId;
        }
    }

    var user_delete_confirmed = false;
    $scope.deleteUser = function(itemId){
        if (user_delete_confirmed) {
            $scope.users.remove(theUserId);
            $location.path('/admin_users')
            $("#user_delete_button").css("background", "#2ba6cb").html("Delete");
            user_delete_confirmed = false;
        } else {
            $("#user_delete_button").css("background", "red").html("Are you sure");
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
                console.log("Station added", $scope.station);
                $scope.stations.add($scope.station);
                $location.path('/admin_station');
            }
        }
    }

    var theStationId;
    //Station info page
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.stationId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlStations.child($routeParams.stationId),$scope,'station_profile');

            theStationId = $routeParams.stationId;
        }
    }

    var station_delete_confirmed = false;
    //removes system based on a unique id
    $scope.deleteStation = function(myid){
        if(station_delete_confirmed) {
            $("#station_delete_button").css("background", "#2ba6cb").html("Delete");
            station_delete_confirmed = false;
            $scope.stations.remove(theStationId);
            $location.path('/admin_station')
            console.log("deleteStation clicked");
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
            $location.path('/admin_station');
            console.log("station updated", station);
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


        auth.createUser(email, password, function(error, user) {
            if (!error) {
                console.log('User Id: ' + user.id + ', Email: ' + user.email);
            }
        });
    }

    var theStaffId;
    //staff info page
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.staffId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlStaff.child($routeParams.staffId),$scope,'staff_profile');

            theStaffId = $routeParams.staffId;
        }
    }


    var staff_update_confirmed = false;
    //updates the staff database have fields instead of string literal
    $scope.updateStaff = function(staff){
        if (staff_update_confirmed) {
            //Grabs the staff properties from the scope to pass into the staff object and update it
            var tempStaffName = document.querySelector("#tempStaffName").value;
            var tempStaffNumber = document.querySelector("#tempStaffNumber").value;
            var tempStaffEmail = document.querySelector("#tempStaffEmail").value;
            var tempStaffPassword = document.querySelector("#tempStaffPassword").value;
            var tempStaffPermission = document.querySelector("#tempStaffPermission").value;

            //Sets the staff properties equal to whatever value is in the text inputs
            $scope.staff_profile.staffName = tempStaffName;
            $scope.staff_profile.staffNumber = tempStaffNumber;
            $scope.staff_profile.staffEmail = tempStaffEmail;
            $scope.staff_profile.staffPassword = tempStaffPassword;
            $scope.staff_profile.staffPermission = tempStaffPermission;

            //visual of staff update
            console.log("staff updated", staff);
            $location.path('/admin_staff');
            $scope.staffs.update(staff);

            $("#staff_update_button").css("background", "#2ba6cb").html("Update");
            staff_update_confirmed = false;
        } else {
            $("#staff_update_button").css("background", "green").html("Are you sure");
            staff_update_confirmed = true;
        }
    }

    var staff_delete_confirmed = false;
    //remove from the databse object but not from the auth list.
    $scope.deleteStaff = function(myid){
        if (staff_delete_confirmed){
            $("#staff_delete_button").css("background", "#2ba6cb").html("Delete");
            $scope.staffs.remove(theStaffId);
            console.log("deleteStaff clicked");
            $location.path('/admin_staff');
            staff_delete_confirmed = false;
        } else {
            $("#staff_delete_button").css("background", "red").html("Are you sure");
            staff_delete_confirmed = true;
        }
    }
}])

gamerscafe.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++)
            input.push(i);
        return input;
    };
})





