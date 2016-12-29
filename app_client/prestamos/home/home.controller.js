// controller wrapped in anonymous function
// to isolate the code from global scope

(function() {

    angular
        .module('Biblioteca')
        .controller('homePrestamoCtrl', homePrestamoCtrl);

    homePrestamoCtrl.$inject = ['$scope', '$resource', '$location', 'authentication'];

    function homePrestamoCtrl($scope, $resource, $location, authentication) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.logout = function() {
            authentication.logout();
            $location.path('/#/');
        };

        vm.Prestamos = $resource('/api/prestamos');
        vm.Prestamos.query(function(prestamos) {
            $scope.prestamos = prestamos;
        });
    }

})();
