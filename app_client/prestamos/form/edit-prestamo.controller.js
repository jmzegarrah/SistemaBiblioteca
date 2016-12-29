(function() {

    angular
        .module('Biblioteca')
        .controller('editPrestamoCtrl', editPrestamoCtrl);

    editPrestamoCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams', 'authentication'];

    function editPrestamoCtrl($scope, $resource, $location, $routeParams, authentication) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.Prestamos = $resource('/api/prestamos/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + authentication.getToken()
                }
            }
        });

        vm.Prestamos.get({
            id: $routeParams.id
        }, function(prestamo) {
            $scope.prestamo = prestamo;
        });

        $scope.save = function() {
            vm.Prestamos.update($scope.prestamo, function() {
                $location.path('/#/prestamos');
            });
        };
    }

})();
