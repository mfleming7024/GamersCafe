var gamerscafe = angular.module('gamerscafe', ['firebase']);

gamerscafe.run(['angularFireAuth', '$rootScope', function(angularFireAuth, $rootScope){
    var url = new Firebase("https://gamerscafe.firebaseio.com/");
    angularFireAuth.initialize(url, {scope: $rootScope, name: "user",path: '/home'});
}]);

gamerscafe.config(function ($routeProvider){
    $routeProvider

        .when("/",{
            controller:"Core",
            templateUrl:"views/home.html",
            authRequired: false
        })

        .when("/login", {
            controller:"Core",
            templateUrl:"views/login.html",
            authRequired: false
        })

        .when("/staff", {
            controller:"Core",
            templateUrl:"views/staff.html",
            authRequired: true
        })

        .when("/admin",{
            controller:"Core",
            templateUrl:"views/admin.html",
            authRequired: true
        })

        .when("/admin_users", {
            controller:"Core",
            templateUrl:"views/admin_users.html",
            authRequired: true
        })

        .when("/admin_games", {
            controller:"Core",
            templateUrl:"views/admin_games.html",
            authRequired: true
        })

        .when("/admin_station", {
            controller:"Core",
            templateUrl:"views/admin_station.html",
            authRequired: true
        })

        .when("/admin_staff", {
            controller:"Core",
            templateUrl:"views/admin_staff.html",
            authRequired: true

        })

        .when("/admin_add_game", {
            controller:"Core",
            templateUrl:"views/admin_add_game.html",
            authRequired: true
        })

        .when("/admin_add_station", {
            controller:"Core",
            templateUrl:"views/admin_add_station.html",
            authRequired: true
        })
        .when("/admin_add_staff", {
            controller:"Core",
            templateUrl:"views/admin_add_staff.html",
            authRequired: true
        })

        .when("/admin_add_system", {
            controller:"Core",
            templateUrl:"views/admin_add_system.html",
            authRequired: true
        })

        .when("/admin_systems", {
            controller:"Core",
            templateUrl:"views/admin_systems.html",
            authRequired: true
        })

        .when("/gts_add_gamer/:user/:stationId", {
            controller:"Core",
            templateUrl:"views/gts_add_gamer.html",
            authRequired: true
        })

        .when("/gts_add_q", {
            controller:"Core",
            templateUrl:"views/gts_add_q.html",
            authRequired: true
        })

        .when("/gts_cancel/:stationId", {
            controller:"Core",
            templateUrl:"views/gts_cancel.html",
            authRequired: true
        })

        .when("/gts_edit_gamer/:stationId", {
            controller:"Core",
            templateUrl:"views/gts_edit_gamer.html",
            authRequired: true
        })
        .when("/admin_user_profile/:displayName/:userId", {
            controller:"Core",
            templateUrl:"views/admin_user_profile.html",
            authRequired: true
        })
        .when("/admin_game_info/:gameTitle/:gameId", {
            controller:"Core",
            templateUrl:"views/admin_game_info.html",
            authRequired: true
        })
        .when("/admin_station_info/:stationNumber/:stationId", {
            controller:"Core",
            templateUrl:"views/admin_station_info.html",
            authRequired: true
        })
        .when("/admin_system_info/:systemName/:systemId", {
            controller:"Core",
            templateUrl:"views/admin_system_info.html",
            authRequired: true
        })
        .when("/admin_staff_info/:staffName/:staffId", {
            controller:"Core",
            templateUrl:"views/admin_staff_info.html",
            authRequired: true
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

