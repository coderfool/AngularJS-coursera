(function () {
    'use strict';

    angular.module('MenuApp')

    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('home', {
            url: '/',
            templateUrl: './templates/home.template.html',
        })

        .state('categories', {
            url: '/categories',
            templateUrl: './templates/category-list.template.html',
            controller: 'CategoriesController as ctrl',
            resolve: {
                categories: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        .state('categories.items', {
            url: '/items/{shortName}',
            templateUrl: './templates/items-list.template.html',
            controller: 'ItemsController as ctrl',
            resolve: {
                responseData: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                    return MenuDataService.getItemsForCategory($stateParams.shortName);
                }]
            }
        });

        $urlRouterProvider.otherwise('/');
    }
})();