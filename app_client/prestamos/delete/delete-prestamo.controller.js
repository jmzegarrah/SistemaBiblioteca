(function() {

    angular
        .module('Biblioteca')
        .controller('deleteprestamoCtrl', deleteprestamoCtrl);

    deleteprestamoCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams'];

    function deleteprestamoCtrl($scope, $resource, $location, $routeParams) {
        var vm = this;

        vm.prestamos = $resource('/api/prestamos/:id', {
            id: '@_id'
        }, {
            delete: {
                method: 'DELETE',
            }
        });

        vm.prestamos.get({
            id: $routeParams.id
        }, function(prestamo) {
            $scope.prestamo = prestamo;
        });

        $scope.delete = function() {
            vm.prestamos.delete({
                id: $routeParams.id
            }, function(prestamo) {
                $location.path('/prestamos/');
            });
        };
    }

})();
