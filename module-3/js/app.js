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
        ctrl.found = [];
        ctrl.nothingFound = false;

        ctrl.getMatchedItems = function() {
            var searchTerm = ctrl.searchTerm.trim().toLowerCase();
            ctrl.nothingFound = false;
            ctrl.found = [];
            
            if (searchTerm == '') {
                ctrl.nothingFound = true;
                return;
            }

            var matchedItems = MenuSearchService.getMatchedMenuItems(searchTerm);

            matchedItems.then(function(foundItems) {
                if (foundItems.length == 0) {
                    ctrl.nothingFound = true;
                    return;
                }
                ctrl.found = foundItems;
            });
        };
        
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
                var allItems = result.data.menu_items;
                var foundItems = [];

                for (var index in allItems) {
                    if (allItems[index].description.indexOf(searchTerm) != -1) {
                        foundItems.push(allItems[index]);
                    }
                }

                return foundItems;
            })
        };
    }

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: './templates/found-items.html',
            scope: {
                foundItems: '<',
                removeItem: '&onRemove'
            }
        };

        return ddo;
    }
})();