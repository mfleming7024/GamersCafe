gamerscafe.controller('GTS', ['$scope', '$routeParams', '$location', 'angularFireCollection', 'angularFireAuth','angularFire','$timeout', function mtCtrl($scope, $routeParams, $location, angularFireCollection, angularFireAuth,angularFire,$timeout){
    //************************************Active stations database***************************************************

    //url to the data needed
    var urlActiveStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/activeStations');

    var wrapper = function () {
        updateTimer();
        $timeout(wrapper, 10000);
    }

    //updates the display's countdown timer for the active gts
    var updateTimer = function(){
        //runs a loop for each station on the active stations database
        for (var i = $scope.activeStations.length - 1; i >= 0; i--) {
            //checks to see if the timer is 0 and will change the status from nomral to red.
            //sets the minutes to the new time
            var time = new Date().getTime() - $scope.activeStations[i].startTime;
            $scope.activeStations[i].displayTime = parseInt($scope.activeStations[i].countdown - (time/1000/60));

            if($scope.activeStations[i].displayTime <= 0){
                console.log("Time is up on Station " + $scope.activeStations[i].stationNumber);
                console.log("the countdown is at " + $scope.activeStations[i].countdown);
                $scope.activeStations[i].displayTime = 0;
            }
        };
    };

    //collects the info from the database for use.
    $scope.activeStations = angularFireCollection(urlActiveStations,function()
    {
        //starts the clocks
        var startKillWatch = $scope.$watch('activeStations', function(){
            $timeout(wrapper);
            startKillWatch();
        })
    });

    //checks to make sure that the routes paramiters are set the sets the tempstaion for use.
    if(typeof $routeParams !== "undefined"){
        if(typeof $routeParams.stationId !== "undefined"){
            $scope.tempStation = {};
            angularFire(urlActiveStations.child($routeParams.stationId),$scope,'tempStation');
            $timeout(function (){
                $scope.tempStation.id = $routeParams.stationId
            });
        }
    }

    //create a active station and adds it to the database
    $scope.addActiveStation = function(){

        $scope.tempStation.stationNumber = document.querySelector("#customDropdown").value;
        $scope.tempStation.boxart = document.querySelector("#games_option").value;
        $scope.tempStation.username = document.querySelector("#username").value;
        $scope.tempStation.countdown = document.querySelector("#time_dropdown").value;
        $scope.tempStation.startTime = new Date().getTime()
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
    
    $scope.cancelActiveStation = function(){
        $scope.tempStation = null;
        console.log('hello');
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
    //************************************Queued stations database***************************************************

    //url to the data needed
    var urlQueuedStations = new Firebase('https://gamerscafe.firebaseio.com/gamerscafe/quedStations');

    //collects the info from the database for use.
    $scope.quedStations = angularFireCollection(urlQueuedStations);

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
    };


}])