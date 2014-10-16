require.config({
    baseUrl: "js/vendor",
    paths: {
        'jquery': './jquery/dist/jquery.min',
        'bootstrap': './bootstrap/dist/js/bootstrap.min',
        'angular': './angular/angular.min',
        'angular-route': './angular-route/angular-route.min',
        'angular-resource': './angular-resource/angular-resource.min',
        '::projectName::': '../app'
    },
    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        },
        angular: {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'angular'
        },
    }
})

require(['angular', '.././controllers', '.././directives', '.././filters', '.././services', 'angular-route', 'angular-resource', 'jquery', 'bootstrap'], 
    function (angular) {

    angular.module('::projectName::', [
        'ngRoute',
        '::projectName::.filters',
        '::projectName::.services',
        '::projectName::.directives',
        '::projectName::.controllers',
    ])
    .config(['$routeProvider', '$locationProvider',

        function ($routeProvider) {
        
            $routeProvider.when('/', {
                'templateUrl': 'partials/home.html',
                'controller': 'defaultCtrl'
            });

        }

    ])

    .config(['$httpProvider',
        function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', '$location', '$window', '$rootScope', '$timeout', 'AuthService', function ($q, $location, $window, $rootScope, $timeout, AuthService) {
                return {
                    'request': function (config) {
                        return config || $q.when(config);
                    }
                }
            }])
        }
    ]);

    angular.bootstrap(document, ['::projectName::']);
});

