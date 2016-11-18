
(function() {
'use strict'

angular.module('Spinner')
    .component('loadingSpinner', {
        templateUrl: 'src/menu/templates/loadingspinner.template.html',
        controller: SpinnerController
    });
;

SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {
    var $ctrl = this;
    var cancelers = [];

    $ctrl.$onInit = function() {
        var cancel = $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
           $ctrl.showSpinner = true;
        });
        cancelers.push(cancel);

        cancel = $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
           $ctrl.showSpinner = false;
        });
        cancelers.push(cancel);

        cancel = $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {
           $ctrl.showSpinner = false;
        });
        cancelers.push(cancel);
    }

    $ctrl.$onDestroy = function() {
        cancelers.forEach(function(item) {
            item();
        });
    }
}

})()
