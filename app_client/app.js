(function() {

    angular.module('Biblioteca', ['ngResource', 'ngRoute']);

    function config($routeProvider) {
        // endpoints are declared here
        $routeProvider
            .when('/', {
                templateUrl: '/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/libros', {
                templateUrl: '/libros/home/home.view.html',
                controller: 'libroHomeCtrl',
                controllerAs: 'vm'
            })
            .when('/add-libro', {
                templateUrl: '/libros/form/libro-form.view.html',
                controller: 'addlibroCtrl',
                controllerAs: 'vm'
            })
            .when('/libro/:id', {
                templateUrl: '/libros/form/libro-form.view.html',
                controller: 'editlibroCtrl',
                controllerAs: 'vm'
            })
            .when('/libro/delete/:id', {
                templateUrl: '/libros/delete/libro-delete.view.html',
                controller: 'deletelibroCtrl',
                controllerAs: 'vm'
            })
            .when('/prestamos', {
                templateUrl: '/prestamos/home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/add-prestamo', {
                templateUrl: '/prestamos/form/prestamo-form.view.html',
                controller: 'addprestamoCtrl',
                controllerAs: 'vm'
            })
            .when('/prestamo/:id', {
                templateUrl: '/prestamos/form/prestamo-form.view.html',
                controller: 'editprestamoCtrl',
                controllerAs: 'vm'
            })
            .when('/prestamo/delete/:id', {
                templateUrl: '/prestamos/delete/prestamo-delete.view.html',
                controller: 'deleteprestamoCtrl',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: '/auth/register/register.view.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/auth/login/login.view.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    angular
        .module('Biblioteca')
        .config(['$routeProvider', config]);

})();
