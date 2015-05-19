'use strict';

angular.module('pingpong')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/player', {
        templateUrl: 'views/player/player.html',
        controller: 'PlayerCtrl',
        controllerAs: 'vm'
      });
  });
