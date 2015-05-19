'use strict';

angular.module('pingpong')
  .controller('NavCtrl', function (authentication) {

    var vm = this;

    angular.extend(vm, {
      authentication: authentication
    });

  });
