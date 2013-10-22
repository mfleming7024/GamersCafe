gamerscafe.controller('Time', ['$scope', 'angularFireCollection', 'angularFireAuth', function mtCtrl($scope, angularFireCollection, angularFireAuth){
//**************************************Time checks and Time setting*******************************************
	
	//Function to be called when the time passes
	var updateTimer = function(){
		//runs a loop for each station on the active stations database
		for (var i = $scope.activeStations.length - 1; i >= 0; i--) {
			//checks to see if the timer is 0 and will change the status from nomral to red.
			if($scope.activeStations[i].countdown === "0"){
				console.log("Time is up on Station " + $scope.activeStations[i].stationNumber);
				console.log("the countdown is at " + $scope.activeStations[i].countdown);
			}else{
				//sets the minutes to the new time
				var time = new Date().getTime() - $scope.activeStations[i].startTime;
				$scope.activeStations[i].displayTime = $scope.activeStations[i].countdown - (time/1000/60);
			}
		};
	};

	var wrapper = function () {
    	updateTimer();
    	setTimeout(wrapper, 60000);
	}

	//starts the clocks
	wrapper();

}]);