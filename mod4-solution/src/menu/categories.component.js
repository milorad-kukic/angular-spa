(function() {
'use strict'

angular.module('MenuApp')
    .component('categories', {
        templateUrl: 'src/menu/templates/categoryitems.template.html',
        bindings: {
            items: '<'
        }
    })
;


})()
