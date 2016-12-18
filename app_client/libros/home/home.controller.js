// controller wrapped in anonymous function
// to isolate the code from global scope

(function() {

    angular
        .module('Biblioteca')
        .controller('libroHomeCtrl', libroHomeCtrl);

    homeCtrl.$inject = ['$scope', '$resource', '$location'];

    function homeCtrl($scope, $resource, $location) {
        var vm = this;

        vm.libros = $resource('/api/libros');
        vm.libros.query(function(libros) {
            $scope.libros = libros;
        });
    }

})();
