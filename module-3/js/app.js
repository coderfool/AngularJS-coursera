(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])

    .controller('NarrowItDownController', NarrowItDownController)

    .service('MenuSearchService', MenuSearchService)

    .directive('foundItems', FoundItems)

    .constant('API_BASE_URL', 'https://davids-restaurant.herokuapp.com');

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.found = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm.trim().toLowerCase());

        ctrl.removeItem = function(index) {
            ctrl.found.splice(index, 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'API_BASE_URL'];

    function MenuSearchService($http, API_BASE_URL) {
        this.getMatchedMenuItems = function(searchTerm) {
            var response = $http({
                method: 'GET',
                url: `${API_BASE_URL}/menu_items.json`,
            });
    
            return response.then(function(result) {
                var foundItems = [];

                for (item in result) {
                    if (item.description.indexOf(searchTerm) != -1) {
                        foundItems.push(item);
                    }
                }

                return foundItems;
            });
        };
    }

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: '/templates/found-items.html',
            scope: {
                foundItems: '<',
                removeItem: '&onRemove'
            }
        };

        return ddo;
    }
})();