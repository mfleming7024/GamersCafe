var gamerscafe = angular.module('gamerscafe', ['firebase']);

gamerscafe.run(['angularFireAuth', '$rootScope', function(angularFireAuth, $rootScope){
	var url = new Firebase("https://gamerscafe.firebaseio.com/");
	angularFireAuth.initialize(url, {name:'user', scope: $rootScope,callback: function(err, user) {
      
    }});
}]);

gamerscafe.config(function ($routeProvider){
	$routeProvider
	.when("/",{
		controller:"",
		templateUrl:"views/templates/home.html"
	})

	.when(" ",{
		controller:"Core",
		templateUrl:" "
	})

	.when(" ", {
		controller:"Core",
		templateUrl:"",
		authRequired: true	
	})

	.when(" ", {
		controller:"Core",
		templateUrl:"",
		authRequired: true
	})

	.when(" ", {
		controller:"Core",
		templateUrl:""
	})

	.otherwise({redirectTo:"/"});
})