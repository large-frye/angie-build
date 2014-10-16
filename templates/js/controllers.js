'use strict';

define(['angular'], function(angular) {

/* Controllers */

angular.module('::projectName::.controllers', [])
    .controller('defaultCtrl', ['$scope',
        function ($scope) {
            $scope.buildSuccess = "My Controller";
        }
    ]);
});