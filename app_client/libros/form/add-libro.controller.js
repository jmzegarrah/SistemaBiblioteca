(function() {

    angular
        .module('Biblioteca')
        .controller('addlibroCtrl', addlibroCtrl);

    addlibroCtrl.$inject = ['$scope', '$resource', '$location'];

    function addlibroCtrl($scope, $resource, $location) {
        var vm = this;

        vm.libros = $resource('/api/libros', null, {
            save: {
                method: 'POST'
            }
        });

        $scope.save = function() {
            vm.libros.save($scope.libro, function() {
                $location.path('/#/');
            });
        };
    }

})();
