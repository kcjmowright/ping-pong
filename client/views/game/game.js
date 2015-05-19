'use strict';

angular.module('pingpong')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/game', {
        templateUrl: 'views/game/game.html',
        controller: 'GameCtrl',
        controllerAs: 'vm'
      });
  });
