var gamerscafe = angular.module('gamerscafe', ['firebase']);

gamerscafe.run(['angularFireAuth', '$rootScope', function(angularFireAuth, $rootScope){
    var url = new Firebase("https://gamerscafe.firebaseio.com/");
    angularFireAuth.initialize(url, {scope: $rootScope, name: "user",path: '/home'});

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

gamerscafe.config(function ($routeProvider){
    $routeProvider

        .when("/",{
            title: 'Home',
            controller:"Core",
            templateUrl:"views/home.html",
            authRequired: false
        })

        .when("/admin",{
            title: 'Admin',
            controller:"Core",
            templateUrl:"views/admin.html",
            authRequired: true
        })

        .when("/admin_users", {
            title: 'Admin Users',
            controller:"Core",
            templateUrl:"views/admin_users.html",
            authRequired: true
        })

        .when("/admin_games", {
            title: 'Admin Games',
            controller:"Core",
            templateUrl:"views/admin_games.html",
            authRequired: true
        })

        .when("/admin_station", {
            title: 'Admin Station',
            controller:"Core",
            templateUrl:"views/admin_station.html",
            authRequired: true
        })

        .when("/admin_staff", {
            title: 'Admin Staff',
            controller:"Core",
            templateUrl:"views/admin_staff.html",
            authRequired: true
        })

        .when("/admin_add_game", {
            title: 'Add Game',
            controller:"Core",
            templateUrl:"views/admin_add_game.html",
            authRequired: true
        })

        .when("/admin_add_station", {
            title: 'Add Station',
            controller:"Core",
            templateUrl:"views/admin_add_station.html",
            authRequired: true
        })
        .when("/admin_add_staff", {
            title: 'Add Staff',
            controller:"Core",
            templateUrl:"views/admin_add_staff.html",
            authRequired: true
        })

        .when("/admin_add_system", {
            title: 'Add System',
            controller:"Core",
            templateUrl:"views/admin_add_system.html",
            authRequired: true
        })

        .when("/admin_systems", {
            title: 'Admin Systems',
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
            title: 'Add To Queue',
            controller:"Core",
            templateUrl:"views/gts_add_q.html",
            authRequired: true
        })

        .when("/gts_cancel/:stationId", {
            title: 'Cancel',
            controller:"Core",
            templateUrl:"views/gts_cancel.html",
            authRequired: true
        })

        .when("/gts_edit_gamer/:stationId", {
            title: 'Edit Gamer',
            controller:"Core",
            templateUrl:"views/gts_edit_gamer.html",
            authRequired: true
        })
        .when("/admin_user_profile/:displayName/:userId", {
            title: 'User Info',
            controller:"Core",
            templateUrl:"views/admin_user_profile.html",
            authRequired: true
        })
        .when("/admin_game_info/:gameTitle/:gameId", {
            title: 'Game Info',
            controller:"Core",
            templateUrl:"views/admin_game_info.html",
            authRequired: true
        })
        .when("/admin_station_info/:stationNumber/:stationId", {
            title: 'Station Info',
            controller:"Core",
            templateUrl:"views/admin_station_info.html",
            authRequired: true
        })
        .when("/admin_system_info/:systemName/:systemId", {
            title: 'System Info',
            controller:"Core",
            templateUrl:"views/admin_system_info.html",
            authRequired: true
        })
        .when("/admin_staff_info/:staffName/:staffId", {
            title: 'Staff Info',
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

