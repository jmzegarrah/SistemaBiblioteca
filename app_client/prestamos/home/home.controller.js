// controller wrapped in anonymous function
// to isolate the code from global scope

(function() {

    angular
        .module('Biblioteca')
        .controller('prestamoHomeCtrl', prestamoHomeCtrl);

    homeCtrl.$inject = ['$scope', '$resource', '$location'];

    function homeCtrl($scope, $resource, $location) {
        var vm = this;

        vm.prestamos = $resource('/api/prestamos');
        vm.prestamos.query(function(prestamos) {
            $scope.prestamos = prestamos;
        });
    }

})();
