(function() {

    angular
        .module('Biblioteca')
        .controller('editLibroCtrl', editLibroCtrl);

    editLibroCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams', 'authentication'];

    function editLibroCtrl($scope, $resource, $location, $routeParams, authentication) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.Libros = $resource('/api/libros/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT',
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


        $scope.save = function() {
            vm.Libros.update($scope.libro, function() {
                $location.path('/#/libros');
            });
        };
    }

})();
