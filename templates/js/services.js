'use strict';

define(['angular'], function(angular) {

    /* Services */

    angular.module('::projectName::.services', ['ngResource'])

    .factory('ExampleFactory', function($resource) {
        return $resource('/sso/:action', {
            action: '@action'
        }, {
            signin: {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                },
                params: {
                    action: 'example'
                },
                isArray: true // If returning array set to true, if just an object do not set this option at all. It defaults to false.
            }
        });
    })

});
