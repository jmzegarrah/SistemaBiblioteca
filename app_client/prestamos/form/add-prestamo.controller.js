(function() {

    angular
        .module('Biblioteca')
        .controller('addprestamoCtrl', addprestamoCtrl);

    addprestamoCtrl.$inject = ['$scope', '$resource', '$location'];

    function addprestamoCtrl($scope, $resource, $location) {
        var vm = this;

        vm.prestamos = $resource('/api/prestamos', null, {
            save: {
                method: 'POST'
            }
        });

        $scope.save = function() {
            vm.prestamos.save($scope.prestamo, function() {
                $location.path('/#/');
            });
        };
    }

})();
