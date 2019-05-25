(function () {
    'use strict';

    angular.module('MenuApp')

    .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['responseData'];

    function ItemsController(responseData) {
        var ctrl = this;
        ctrl.items = responseData.menu_items;
        if (ctrl.items.length > 0) {
            ctrl.categoryName = responseData.category.name;     
        }
    }
})();