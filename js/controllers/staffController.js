gamerscafe.controller('StaffCrud', ['$scope', '$routeParams', '$location', 'angularFireCollection', 'angularFireAuth','angularFire','$timeout', function mtCtrl($scope, $routeParams, $location, angularFireCollection, angularFireAuth,angularFire,$timeout){
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
            if ($scope.staff.staffName == "" || $scope.staff.staffName == null) { //Staff Name
                console.log("No Staff Name Given");
            } else if ($scope.staff.staffNumber == "" || $scope.staff.staffNumber == null) { //Staff Cell Number
                console.log("No Number Given");
            } else if ($scope.staff.staffEmail == "" || $scope.staff.staffEmail == null) { //Staffs Email
                console.log("Please Enter an Email");
            } else if ($scope.staff.staffPassword == "" || $scope.staff.staffPassword == null) { //Staff Password
                console.log("Please Enter A Password");
            } else if ($scope.staff.staffPermission == "" || $scope.staff.staffPermission == null) { //?Permission
                console.log("Please select a permission");
            } else {
                $scope.staffs.add($scope.staff);
                $location.path('/admin_staff');
            }
        }
        //Future Sign ups
//        auth.createUser(email, password, function(error, user) {
//            if (!error) {
//                console.log('User Id: ' + user.id + ', Email: ' + user.email);
//            }
//        });
    }
    //Get Staff Id
    var theStaffId;
    //staff info page
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.staffId !== "undefined"){
            //collects the info from the database for use.
            angularFire(urlStaff.child($routeParams.staffId),$scope,'staff_profile');
            theStaffId = $routeParams.staffId; //Gets the staff ID of current page/selected
        }
    }

    //updates the staff database have fields instead of string literal
    var staff_update_confirmed = false;
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
            $location.path('/admin_staff');
            $scope.staffs.update(staff); //Updates Firebase

            $("#staff_update_button").css("background", "#2ba6cb").html("Update");
            staff_update_confirmed = false;
        } else {
            $("#staff_update_button").css("background", "green").html("Are you sure");
            staff_update_confirmed = true;
        }
    }

    //remove from the databse object but not from the auth list.
    var staff_delete_confirmed = false;
    $scope.deleteStaff = function(myid){
        if (staff_delete_confirmed){
            $("#staff_delete_button").css("background", "#2ba6cb").html("Delete");
            $scope.staffs.remove(theStaffId);;
            $location.path('/admin_staff');
            staff_delete_confirmed = false;
        } else {
            $("#staff_delete_button").css("background", "red").html("Are you sure");
            staff_delete_confirmed = true;
        }
    }
}])