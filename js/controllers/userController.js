gamerscafe.controller('UserCrud', ['$scope', '$routeParams', '$location', 'angularFireCollection', 'angularFireAuth','angularFire','$timeout', function mtCtrl($scope, $routeParams, $location, angularFireCollection, angularFireAuth,angularFire,$timeout){
    //************************************Users CRUD***************************************************

    //url to the data needed
    var urlUsers = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/users');

    //collects the info from the database for use.
    $scope.users = angularFireCollection(urlUsers, function(snap){
        var users = snap.val();
        if(typeof $routeParams !== "undefined"){
            if(typeof $routeParams.user !== "undefined"){
                $scope.tempUser =  $routeParams.user; // Gets The Users Name
                $scope.tempUsers =  $routeParams.stationId; //Gets the Station Id for the GTS
            }
        }
    });

    // Var for UserId
    var theUserId;
    //Users info page
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.userId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlUsers.child($routeParams.userId),$scope,'user_profile');
            theUserId = $routeParams.userId; //Gets current selected user Id
        }
    }

    //User Delete
    var user_delete_confirmed = false;
    $scope.deleteUser = function(itemId){
        if (user_delete_confirmed) {
            $scope.users.remove(theUserId); //Deletes from Firebase
            $location.path('/admin_users')
            $("#user_delete_button").css("background", "#2ba6cb").html("Delete");
            user_delete_confirmed = false;
        } else {
            $("#user_delete_button").css("background", "red").html("Are you sure");
            user_delete_confirmed = true;
        }
    }

    //User Update
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

            $scope.users.update(user); //Updates the user and pass to Firebase
        } else {
            $("#user_update_button" + user.$id).css("background", "green").html("Are you sure");
            user_update_confirmed = true;
        }
    }
}])