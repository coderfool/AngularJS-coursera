(function() {
    'use strict';

    angular.module('public')

    .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['FavoriteDishService'];

    function UserInfoController(FavoriteDishService) {
        var ctrl = this;
        
        if (FavoriteDishService.user == undefined) return;

        ctrl.user = FavoriteDishService.user; 
    }
})();