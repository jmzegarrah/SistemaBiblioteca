(function() {

    angular
        .module('Biblioteca')
        .controller('loginCtrl', loginCtrl);

    loginCtrl.$inject = ['$location', 'authentication'];

    function loginCtrl($location, authentication) {
        var vm = this;

        vm.pageHeader = {
            title: 'Sign in to Biblioteca'
        };

        vm.credentials = {
            email: "",
            password: ""
        };

        vm.returnPage = $location.search().page || '/libros';

        vm.onSubmit = function() {
          console.log(JSON.stringify(vm.credentials));
            vm.formError = "";
            if (!vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required, please try again";
                return false;
            } else {
                vm.doLogin();
            }
            console.log(JSON.stringify(vm.formError));
        };

        vm.doLogin = function() {
            vm.formError = "";
            authentication
                .login(vm.credentials)
                .error(function(err) {
                    vm.formError = err;
                })
                .then(function() {
                  console.log(JSON.stringify(vm));
                    $location.search('/', null);
                    $location.path(vm.returnPage);
                });
                console.log(JSON.stringify(vm.formError));
        };

    }

})();
