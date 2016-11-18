(function() {
'use strict'

angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")

;

MenuDataService.$inject = ['$http', 'ApiBasePath', '$q', '$timeout']
function MenuDataService($http, ApiBasePath, $q, $timeout) {
    var service = this;
    
    service.getAllCategories = function() {
        var result = $http({
            method: "GET",
            url: (ApiBasePath + "/categories.json")
        }).then(function(response) {
            return response.data;
        });

        return result;
    };

    service.getItemsForCategory = function(categoryShortName) {
        var result = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json"),
            params: {
                category: categoryShortName
            }
        }).then(function(response) {
            return response.data;
        });
        return result;
    };

}

})()
