(function(){
  'use strict';

  angular.module('pingpong').factory('authentication', function($location, $window, Player, toast){
    var authenticated = null,
      checked = false;

    return {
      authenticate: function(username, password){
        Player.authenticate({}, {
          username: username,
          password: password
        }, function(player){
          authenticated = player;
          $location.url('/');
        }, function(err){
          toast.addErrorMessage('Invalid credentials');
        });
      },
      logout: function(){
        authenticated = null;
        Player.logout({}, {}, function(){
          $location.url('/');
        }, function(err){
          toast.addErrorMessage('Invalid logout response');
        });
      },
      authenticated: function(){
        if(!checked){
          checked = true;
          return Player.authenticate({},{},function(player){
            authenticated = player;
          }, function(){
            authenticated = null;
          });
        }
        return authenticated;
      }
    };
  });

})();
