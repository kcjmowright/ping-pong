'use strict';

angular.module('pingpong')
  .controller('PlayerCtrl', function ($modal, authentication, Player, Socket, toast) {

    var vm = this;

    angular.extend(vm, {
      authenticated: authentication.authenticated(),
      players: Player.query(),
      player: {
        _id: null,
        rfid: null,
        name: null,
        hash: null,
        firstName: null,
        lastName: null,
        admin: false
      },
      reset: function(){
        vm.player = {
          _id: null,
          rfid: null,
          name: null,
          hash: null,
          firstName: null,
          lastName: null,
          admin: false
        };
      },
      disabled: function () {
        if (!vm.authenticated) {
          return true;
        }
        if(vm.authenticated.admin){
          return false;
        }
        return !!((vm.authenticated._id !== vm.player._id) && vm.player._id);
      },
      selected: function(player){
        return player._id === vm.player._id;
      },
      query: function(){
        vm.players = Player.query();
      },
      remove: function(){
        Player.delete({id: vm.player._id}, function(){
          toast.addSuccessMessage('Successfully deleted');
          vm.reset();
          vm.query();
        }, function(){
          toast.addErrorMessage('Unable to delete');
        });
      },
      confirm: function(){
        var modal = $modal.open({
          templateUrl: 'views/player/confirm-remove.html',
          size: 'sm'
        });
        modal.result.then(function() {
          vm.remove();
        });
      },
      edit: function(playerId){
        vm.player = Player.get({
          id: playerId
        });
      },
      save: function(){
        if(!vm.player.hash){
          delete vm.player.hash;
        }
        if(!!vm.player._id){
          Player.update({id: vm.player._id}, vm.player, function(){
            toast.addSuccessMessage('Successfully saved');
            vm.query();
            vm.reset();
          }, function(){
            toast.addErrorMessage('Unable to save player.');
          });
        } else {
          Player.save({}, vm.player, function(){
            toast.addSuccessMessage('Successfully saved');
            vm.query();
            vm.reset();
          }, function(){
            toast.addErrorMessage('Unable to save player.');
          });
        }
      }
    });

  });
