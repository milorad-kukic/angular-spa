(function() {
'use strict'

angular.module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", FoundItems)
;

    NarrowItDownController.$inject = ["MenuSearchService"]
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;

        ctrl.searched = false;
        ctrl.found = [];

        ctrl.removeItem = function(index) {
            console.log('removeItem called....');
            ctrl.found.splice(index, 1);
        }

        ctrl.getMatchedMenuItems = function(searchTerm) {
            var test = MenuSearchService.getMatchedMenuItems(searchTerm);

            test.then(function(result) {
                ctrl.found = result;
            });

            ctrl.searched = true;
        };
    };


    MenuSearchService.$inject = ["$http"]
    function MenuSearchService($http) {
        var search = this;

        search.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
            }).then(function(result) {
                var foundItems = [];
                for (var i = 0; i < result.data["menu_items"].length; i++) {
                    var item = result.data["menu_items"][i];

                    if (item.description.indexOf(searchTerm) !== -1) {
                        foundItems.push(item);
                    }
                }

                return foundItems;
            });
        }
    };

    function FoundItems() {
        var ddo = {
            templateUrl: 'list-item.html',
            scope: {
                items: '<',
                searched: '=',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        return ddo;
    };

    function FoundItemsDirectiveController() {
        var list = this;

        list.showEmptyListMessage = function() {
            if (list.searched === true && list.items.length === 0) {
                return true;
            } else {
                return false;
            }
        }
    }

})();
