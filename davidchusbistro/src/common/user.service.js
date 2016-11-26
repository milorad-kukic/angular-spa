(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

UserService.$inject = []
function UserService() {
    var userService = this;

    userService.signedUser = {};

    userService.signUpUser = function(userObj) {
        userService.signedUser = userObj;
    };

    userService.getSignedUser = function() {
        return userService.signedUser;
    };
}

})();
