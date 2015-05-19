'use strict';

angular.module('pingpong')
  .controller('LoginCtrl', function (authentication) {

    var vm = this;

    angular.extend(vm, {
      username: null,
      password: null,
      login: function(){
        authentication.authenticate(vm.username, vm.password);
      }
    });

  });
