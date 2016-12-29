(function() {

    angular
        .module('Biblioteca')
        .controller('deletePrestamoCtrl', deletePrestamoCtrl);

    deletePrestamoCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams', 'authentication'];

    function deletePrestamoCtrl($scope, $resource, $location, $routeParams, authentication) {
        var vm = this;

        vm.Prestamos = $resource('/api/prestamos/:id', {
            id: '@_id'
        }, {
            delete: {
                method: 'DELETE',
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

        $scope.delete = function() {
            vm.Prestamos.delete({
                id: $routeParams.id
            }, function(prestamo) {
                $location.path('/#/prestamos/');
            });
        };
    }

})();
