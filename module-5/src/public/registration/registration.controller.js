(function() {
    'use strict';

    angular.module('public')

    .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['FavoriteDishService'];

    function RegistrationController(FavoriteDishService) {
        var ctrl = this;

        ctrl.getMenuItem = function(shortName) {
            if (shortName == undefined || shortName == '') return;

            var itemPromise = FavoriteDishService.getMenuItem(shortName);
            
            itemPromise.then(function(response) {
                if (response != null) {
                    ctrl.user.favDish = response;
                    ctrl.favDishFound = true;
                } 
                else {
                    ctrl.favDishFound = false;                    
                }
            });
        };

        ctrl.submit = function() {
            ctrl.success = true;
            FavoriteDishService.setUser(ctrl.user);
        }
    }
})();