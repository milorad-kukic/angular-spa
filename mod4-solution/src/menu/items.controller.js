(function() {
'use strict'

angular.module('MenuApp')
    .controller('ItemListController', ItemListController)
;

ItemListController.$inject = ['items']
function ItemListController(items) {
    var $ctrl = this;

    $ctrl.items = items['menu_items'];
    $ctrl.category = items['category'];
}

})()
