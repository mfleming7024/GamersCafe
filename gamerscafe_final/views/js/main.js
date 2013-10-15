var gamerscafe = angular.module('gamerscafe', ['firebase']);

gamerscafe.run(['angularFireAuth', '$rootScope', function(angularFireAuth, $rootScope){
	var url = new Firebase("https://gamerscafe.firebaseio.com/");
	angularFireAuth.initialize(url, {name:'user', scope: $rootScope,callback: function(err, user) {
      
    }});
}]);

gamerscafe.config(function ($routeProvider){
	$routeProvider
	.when("/",{
		controller:"Core",
		templateUrl:"views/templates/home.html"
	})

	.when("/admin",{
		controller:"",
		templateUrl:" "
	})

	.when("/staff", {
		controller:"Core",
		templateUrl:"",
		authRequired: true	
	})

	.otherwise({redirectTo:"/"});
})