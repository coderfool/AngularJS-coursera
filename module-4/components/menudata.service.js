(function () {
    'use strict';

    angular.module('data')
    
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];

    function MenuDataService($http) {
        var service = this;
        var baseUrl = 'https://davids-restaurant.herokuapp.com';

        service.getAllCategories = function() {
            var response = $http({
                method: 'GET',
                url: `${baseUrl}/categories.json`
            });

            return response.then(function(result) {
                return result.data;
            });
        };

        service.getItemsForCategory = function(categoryShortName) {
            var response = $http({
                method: 'GET',
                url: `${baseUrl}/menu_items.json?category=${categoryShortName}`
            });

            return response.then(function(result) {
                return result.data;
            });
        };
    }
})();