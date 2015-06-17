'use strict';

angular.module('pingpong', [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'btford.socket-io',
  'toaster',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker'
]).config(function ($locationProvider, $routeProvider) {

  $routeProvider
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);

}).run(function ($location, $rootScope, authentication) {
  
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    var authenticated = authentication.authenticated();
    if ((authenticated === null || !authenticated.$resolved) && 
      $location.path() !== '/' && $location.path() !== '/login') {
      event.preventDefault();
      $location.path('/');
    }
  });
  
});
