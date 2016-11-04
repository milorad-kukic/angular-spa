(function() {
'use strict'

angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
;

    ToBuyController.$inject = ['ShoppingListCheckOffService']
    function ToBuyController(ShoppingListCheckOffService) {
        this.itemsToBuy = ShoppingListCheckOffService.getToBuyItems();
        this.noMoreItemsToBuy = function() {
            return this.itemsToBuy.length == 0;
        };

        this.buyItem = ShoppingListCheckOffService.buyItem;
    };

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.boughtItems = ShoppingListCheckOffService.getBougthItems();

        this.nothingBoughtYet = function() {
            return this.boughtItems.length == 0;
        };
    };

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            {name: "cookies", quantity: 10 },
            {name: "chips", quantity: 4 },
            {name: "peanuts", quantity: 5 },
            {name: "napkins", quantity: 15 },
            {name: "beers", quantity: 20 }
        ];
        var boughtItems = [];

        service.getToBuyItems = function() {
            return toBuyItems;
        };

        service.getBougthItems = function() {
            return boughtItems;
        };

        service.buyItem = function(index) {
            var item = toBuyItems[index];
            toBuyItems.splice(index, 1);
            boughtItems.push(item);
        };
    };

})();
