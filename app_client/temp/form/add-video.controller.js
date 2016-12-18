(function() {

    angular
        .module('Biblioteca')
        .controller('addLibroCtrl', addLibroCtrl);

    addLibroCtrl.$inject = ['$scope', '$resource', '$location', 'authentication'];

    function addLibroCtrl($scope, $resource, $location, authentication) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        vm.Libros = $resource('/api/libros', null, {
            save: {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + authentication.getToken()
                }
            }
        });

        $scope.save = function() {
            vm.Libros.save($scope.libro, function() {
                $location.path('/#/');
            });
        };
    }

})();
