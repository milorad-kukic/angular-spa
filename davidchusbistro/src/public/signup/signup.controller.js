(function() {
'use strict'

angular.module('public')
    .controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope', 'MenuService', 'UserService'];
function SignUpController($scope, MenuService, UserService) {
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

    $scope.$watch("signupCtrl.favoriteDish", function(newValue, oldValue) {
        if (newValue !== oldValue) {
            var p = MenuService.getMenuItem(newValue);
            p.then(function(data) {
                signupCtrl.favoriteDishObj = data;
            });
        }
    });
};

})();
