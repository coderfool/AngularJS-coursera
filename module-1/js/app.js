(function() {
    'use strict';
    
    angular.module('LunchCheck', [])

    .controller('LunchCheckController', lunchCheckController);

    lunchCheckController.$inject = ['$scope'];

    function lunchCheckController($scope) {
        $scope.lunchItems = '';
        $scope.message = '';

        $scope.checkIfTooMuch = function() {

            var items = $scope.lunchItems.split(',');
            var itemCount = 0;

            for (var i = 0; i < items.length; i++) {
                itemCount += (items[i].trim() != '') ? 1 : 0;
            }

            if (itemCount == 0) {
                $scope.message = 'Please enter data first';
            }
            else if (itemCount < 4) {
                $scope.message = 'Enjoy!';
            }
            else {
                $scope.message = 'Too much!';
            }
        };
    }
})();