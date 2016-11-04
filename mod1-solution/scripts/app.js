(function() {
'use strict'

angular.module('LunchCheck', [])

    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) { 
        $scope.dishes = "";
        $scope.tooMuch = false;
        $scope.message = "";

        $scope.checkIfTooMuch = function() {
            var t = $scope.dishes.split(',');
            var numberOfItems = 0;
            
            if ($scope.dishes.trim() === "") {
                $scope.message = "Please enter data first";
                return;
            } else {
                for (var i=0; i < t.length; i++) {
                    var dish = t[i];
                    if (dish.trim() != "") {
                        numberOfItems += 1;
                    }
                }
            }
            console.log(numberOfItems);


            if (numberOfItems > 3) {
                $scope.message = "Too much!";
            } else {
                $scope.message = "Enjoy!";
            }
        };
    };
})();
