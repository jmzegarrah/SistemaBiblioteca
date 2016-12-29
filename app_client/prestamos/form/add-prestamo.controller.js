(function() {

    angular
        .module('Biblioteca')
        .controller('addPrestamoCtrl', addPrestamoCtrl);

    addPrestamoCtrl.$inject = ['$scope', '$resource', '$location', 'authentication'];

    function addPrestamoCtrl($scope, $resource, $location, authentication) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.Prestamos = $resource('/api/prestamos', null, {
            save: {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + authentication.getToken()
                }
            }
        });

        $scope.save = function() {
            vm.Prestamos.save($scope.prestamo, function() {
                $location.path('/#/prestamos');
            });
        };
    }

})();
