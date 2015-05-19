'use strict';

angular.module('pingpong')
  .factory('Player', function ($resource) {
    return $resource('/api/players/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      },
      authenticate: {
        url: '/api/players/authenticate',
        method: 'POST',
        cache: false
      },
      logout: {
        url: '/api/players/logout',
        method: 'POST',
        cache: false
      }
    });
  });
