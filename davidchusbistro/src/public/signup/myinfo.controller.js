(function() {
'use strict'

angular.module('public')
    .controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['ApiPath', 'UserService', 'info', 'favorite_dish'];
function MyInfoController(ApiPath, UserService, info, favorite_dish) {
    var myInfo = this;

    myInfo.info = info;
    myInfo.favorite_dish = favorite_dish
    myInfo.basePath = ApiPath;
}

})();
