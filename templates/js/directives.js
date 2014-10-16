'use strict';

define(['angular'], function(angular) {

    /* Directives */

    angular.module('::projectName::.directives', [])

    .directive('myFirstDirective', ['',
        function() {
            return function(scope, elm, attrs) {
                return true;
            };
        }
    ]);

});
