(function() {
    'use strict';

    angular.module('public')

    .service('FavoriteDishService', FavoriteDishService);

    FavoriteDishService.$inject = ['$http', 'API_BASE_PATH'];

    function FavoriteDishService($http, API_BASE_PATH) {
        var service = this;
        
        service.getMenuItem = function(shortName) {
            var promise = $http.get(`${API_BASE_PATH}/menu_items/${shortName}.json`);

            return promise.then(function(response) {
                return response.data;
            })
            
            .catch(function() {
                return null;
            });
        };

        service.setUser = function(user) {
            service.user = user;
        };
    }
})();