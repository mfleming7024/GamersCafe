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

	.when("/login", {
		controller:"Core",
		templateUrl:"views/templates/login.html",
	})

	.when("/staff", {
		controller:"Core",
		templateUrl:"views/templates/staff.html",
	})

	.when("/admin",{
		controller:"Core",
		templateUrl:"views/templates/admin.html"
	})

	.when("/staff", {
		controller:"Core",
		templateUrl:"views/templates/staff.html",
	})

	.when("/admin_users", {
		controller:"Core",
		templateUrl:"views/templates/admin_users.html",
	})

	.when("/admin_games", {
		controller:"Core",
		templateUrl:"views/templates/admin_games.html",
	})

	.when("/admin_station", {
		controller:"Core",
		templateUrl:"views/templates/admin_station.html",
	})

	.when("/admin_staff", {
		controller:"Core",
		templateUrl:"views/templates/admin_staff.html",
	})

	.when("/admin_add_game", {
		controller:"Core",
		templateUrl:"views/templates/admin_add_game.html",
	})

	.when("/admin_add_station", {
		controller:"Core",
		templateUrl:"views/templates/admin_add_station.html",
	})

	.when("/admin_add_system", {
		controller:"Core",
		templateUrl:"views/templates/admin_add_system.html",
	})

	.when("/admin_systems", {
		controller:"Core",
		templateUrl:"views/templates/admin_systems.html",
	})

	.when("/gts_add_gamer", {
		controller:"Core",
		templateUrl:"views/templates/gts_add_gamer.html",
	})

	.when("/gts_add_q", {
		controller:"Core",
		templateUrl:"views/templates/gts_add_q.html",
	})

	.when("/gts_cancel", {
		controller:"Core",
		templateUrl:"views/templates/gts_cancel.html",
	})

	.when("/gts_edit_gamer", {
		controller:"Core",
		templateUrl:"views/templates/gts_edit_gamer.html",
	})

	.otherwise({redirectTo:"/"});

}).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});