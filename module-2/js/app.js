(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])

    .controller('ToBuyController', ToBuyController)

    .controller('AlreadyBoughtController', AlreadyBoughtController)

    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var buyController = this;
        buyController.items = ShoppingListCheckOffService.itemsToBuy;

        buyController.buyItem = function(index) {
            var item = buyController.items[index]; 
            ShoppingListCheckOffService.removeItem(index);
            ShoppingListCheckOffService.boughtItems.push(item);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var boughtController = this;
        boughtController.items = ShoppingListCheckOffService.boughtItems;
    }

    function ShoppingListCheckOffService() {
        var service = this;

        service.itemsToBuy = [
            {
                name: 'Cookies',
                qty: 10
            },
            {
                name: 'Chips',
                qty: 7
            },
            {
                name: 'Pepsi',
                qty: 5
            },
            {
                name: 'Popcorn',
                qty: 12
            },
            {
                name: 'Potatoes',
                qty: 4
            }
        ];
    
        service.boughtItems = [];

        service.removeItem = function(index) {
            service.itemsToBuy.splice(index, 1);
        };
    }
})();