(function() {

    angular
        .module('Biblioteca')
        .controller('deleteLibroCtrl', deleteLibroCtrl);

    deleteLibroCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams', 'authentication'];

    function deleteLibroCtrl($scope, $resource, $location, $routeParams, authentication) {
        var vm = this;

        vm.Libros = $resource('/api/libros/:id', {
            id: '@_id'
        }, {
            delete: {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + authentication.getToken()
                }
            }
        });

        vm.Libros.get({
            id: $routeParams.id
        }, function(libro) {
            $scope.libro = libro;
        });

        $scope.delete = function() {
            vm.Libros.delete({
                id: $routeParams.id
            }, function(libro) {
                $location.path('/#/libros/');
            });
        };
    }

})();
