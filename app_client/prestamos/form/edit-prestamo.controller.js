(function() {

    angular
        .module('Biblioteca')
        .controller('editprestamoCtrl', editprestamoCtrl);

    editprestamoCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams'];

    function editprestamoCtrl($scope, $resource, $location, $routeParams) {
        var vm = this;

        vm.prestamos = $resource('/api/prestamos/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        vm.prestamos.get({
            id: $routeParams.id
        }, function(prestamo) {
            $scope.prestamo = prestamo;
        });

        $scope.save = function() {
            vm.prestamos.update($scope.prestamo, function() {
                $location.path('/#/');
            });
        };
    }

})();
