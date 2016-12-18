(function() {

    angular
        .module('Biblioteca')
        .controller('deletelibroCtrl', deletelibroCtrl);

    deletelibroCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams'];

    function deletelibroCtrl($scope, $resource, $location, $routeParams) {
        var vm = this;

        vm.libros = $resource('/api/libros/:id', {
            id: '@_id'
        }, {
            delete: {
                method: 'DELETE',
            }
        });

        vm.libros.get({
            id: $routeParams.id
        }, function(libro) {
            $scope.libro = libro;
        });

        $scope.delete = function() {
            vm.libros.delete({
                id: $routeParams.id
            }, function(libro) {
                $location.path('/libros/');
            });
        };
    }

})();
