(function () {
    'use strict';

    angular.module('MenuApp')

    .component('spinner', {
        templateUrl: './templates/spinner.template.html',
        controller: 'SpinnerController as ctrl'
    });
})();