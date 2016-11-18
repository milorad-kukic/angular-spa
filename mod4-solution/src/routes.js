(function() {
'use strict'

angular.module('MenuApp')
    .config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');


    // Set up UI states
    $stateProvider

    // home page
    .state('home', {
        url: '/',
        templateUrl: 'src/menu/templates/home.template.html'
    })

    // categories page
    .state('categories', {
        url: '/categories',
        templateUrl: 'src/menu/templates/categories.template.html',
        controller: 'MenuCategoriesController as categories',
        resolve: {
            items: ['MenuDataService', function(MenuDataService) {
                return MenuDataService.getAllCategories();
            }]
        }
    })

    // items page
    .state('items', {
        url: '/items/{categoryId}',
        templateUrl: 'src/menu/templates/itemlist.template.html',
        controller: 'ItemListController as itemList',
        resolve: {
            items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.categoryId);
            }]
        }
    })

    // contact page
    .state('contact', {
        url: '/contact',
        templateUrl: 'src/menu/templates/contact.template.html'
    })

};

})()
