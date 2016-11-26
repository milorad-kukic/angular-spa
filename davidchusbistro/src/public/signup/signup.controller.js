(function() {
'use strict'

angular.module('public')
    .controller('SignUpController', SignUpController)
    .factory('debounce', ['$timeout', function($timeout) {
        return function(callback, interval) {
            var timeout = null;
            return function() {
                $timeout.cancel(timeout);
                timeout = $timeout(function() {
                    var args = Array.prototype.slice.call(arguments);
                    callback.apply(this, arguments);
                }, interval);
            }
        }
    }])
;

SignUpController.$inject = ['$scope', 'MenuService', 'UserService', 'debounce'];
function SignUpController($scope, MenuService, UserService, debounce) {
    var signupCtrl = this;

    signupCtrl.favoriteDishObj = null;

    signupCtrl.signUpUser = function() {
        var userObj = {
            first_name: signupCtrl.first_name,
            last_name: signupCtrl.last_name,
            email: signupCtrl.email,
            phone_number: signupCtrl.phone_number,
            favorite_dish: signupCtrl.favoriteDish
        }
        UserService.signUpUser(userObj);
    };

    signupCtrl.getCurrentUser = function() {
        return UserService.getSignedUser();
    }

    $scope.$watch("signupCtrl.favoriteDish", debounce(function() {
        if(!signupCtrl.favoriteDish){
            return;
        }
            var p = MenuService.getMenuItem(signupCtrl.favoriteDish);
            p.then(function(data) {
                signupCtrl.favoriteDishObj = data;
            });
        }, 800)
    )
};

})();
