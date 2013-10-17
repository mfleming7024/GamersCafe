gamerscafe.controller('Time', ['$scope', 'angularFireCollection', 'angularFireAuth', function mtCtrl($scope, angularFireCollection, angularFireAuth){
//**************************************Time checks and Time setting*******************************************
	
	//Function to be called when the time passes
	var updateTimer = function(){
		//runs a loop for each station on the active stations database
		for (var i = $scope.activeStations.length - 1; i >= 0; i--) {
			console.log("Time is up on Station " + $scope.activeStations[i].stationNumber);
			console.log("the countdown is at " +$scope.activeStations[i].countdownMin +":"+$scope.activeStations[i].countdownHours);

			//checks to see if the timer is 00:00 and will change the status from nomral to red.
			if($scope.activeStations[i].countdownHours + ":" + $scope.activeStations[i].countdownMin === "00:00"){

				console.log("Time is up on Station " + $scope.activeStations[i].stationNumber);

				console.log("the countdown is at " +$scope.activeStations[i].countdownMin +":"+$scope.activeStations[i].countdownHours);

			}else{

				//Checks to see if the minutes 00 and sets them to 59 and minuses one from the hours
				if($scope.activeStations[i].countdownMin === "00"){
					$scope.activeStations[i].countdownMin = "59";
					$scope.activeStations[i].countdownHours = $scope.activeStations[i].countdownHours- 1;
				}else{
					//sets the minutes to the new time
					$scope.activeStations[i].countdownMin = $scope.activeStations[i].countdownMin - 1;
				}

				//updates the database
				$scope.activeStations.update($scope.activeStations[i]);
			}
		};
	};

	//Sets off a timer every minute and if the minutes come back a single digit adds a 0 to front of the number.
	var wrapper = function () {
    	updateTimer();
    	var hours = new Date().getHours();
    	var min =  new Date().getMinutes();
    	if(min < 10){
    		var time = hours+":0"+min;
    	}else{
    		var time = hours+":"+min;
    	}
    	console.log(time);
    	setTimeout(wrapper, 60000);
	}

	//starts the clocks
	wrapper();

}]);