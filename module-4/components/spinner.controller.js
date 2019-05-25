(function () {
    'use strict';

    angular.module('MenuApp')

    .controller('SpinnerController', SpinnerController);

    SpinnerController.$inject = ['$rootScope'];

    function SpinnerController($rootScope) {
        var ctrl = this;
        var cancellers = [];

        var cancel = $rootScope.$on('$stateChangeStart', function () {
            ctrl.showSpinner = true;
        });

        cancellers.push(cancel);

        var cancel = $rootScope.$on('$stateChangeSuccess', function () {
            ctrl.showSpinner = false;
        });

        cancellers.push(cancel);

        ctrl.$onDestroy = function () {
            for (cancel in cancellers) {
                cancel();
            }
        };
    }
})();