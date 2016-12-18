(function() {

    angular
        .module('Biblioteca')
        .controller('editlibroCtrl', editlibroCtrl);

    editlibroCtrl.$inject = ['$scope', '$resource', '$location', '$routeParams'];

    function editlibroCtrl($scope, $resource, $location, $routeParams) {
        var vm = this;

        vm.libros = $resource('/api/libros/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        vm.libros.get({
            id: $routeParams.id
        }, function(libro) {
            $scope.libro = libro;
        });

        $scope.save = function() {
            vm.libros.update($scope.libro, function() {
                $location.path('/#/');
            });
        };
    }

})();
