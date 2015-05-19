'use strict';

angular.module('pingpong')
  .controller('GameCtrl', function ($modal, authentication, Game, Player, Socket, toast) {

  var vm = this;
  angular.extend(vm, {
    authenticated: authentication.authenticated(),
    playerMap: {},
    players: Player.query({}, function(){
      vm.playerMap = _.indexBy(vm.players, '_id');
      vm.players = _.sortBy(vm.players, 'name');
    }),
    playerById: function(id){
      return vm.playerMap[id];
    },
    games: Game.query(),
    game: {
      _id: null,
      startDate: new Date(),
      endDate: null,
      name: null,
      home: [],
      homeScore: 0,
      visitor: [],
      visitorScore: 0
    },
    reset: function(){
      vm.game = {
        _id: null,
        startDate: new Date(),
        endDate: null,
        name: null,
        home: [],
        homeScore: 0,
        visitor: [],
        visitorScore: 0
      };
    },
    selected: function(game){
      return game._id === vm.game._id;
    },
    query: function(){
      vm.games = Game.query();
    },
    remove: function(){
      Game.delete({id: vm.game._id}, function(){
        toast.addSuccessMessage('Successfully deleted');
        vm.reset();
        vm.query();
      }, function(){
        toast.addErrorMessage('Unable to delete');
      });
    },
    confirm: function(){
      var modal = $modal.open({
        templateUrl: 'views/game/confirm-remove.html',
        size: 'sm'
      });
      modal.result.then(function() {
        vm.remove();
      });
    },
    edit: function(gameId){
      vm.game = Game.get({id: gameId});
    },
    save: function(){
      if(!!vm.game.home && !_.isArray(vm.game.home)){
        vm.game.home = [vm.game.home];
      }
      if(!!vm.game.visitor && !_.isArray(vm.game.visitor)){
        vm.game.visitor = [vm.game.visitor];
      }
      if(!!vm.game._id){
        Game.update({id: vm.game._id}, vm.game, function(){
          toast.addSuccessMessage('Successfully saved');
          vm.query();
          vm.reset();
        }, function(){
          toast.addErrorMessage('Unable to save game.');
        });
      } else {
        Game.save({}, vm.game, function(){
          toast.addSuccessMessage('Successfully saved');
          vm.query();
          vm.reset();
        }, function(){
          toast.addErrorMessage('Unable to save game.');
        });
      }
    },
    today: function() {
      return new Date();
    },
    minDate: new Date(),
    clearDate: function () {
      vm.gate.startDate = null;
    },
    dateDisabled: function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    },
    dateToggleMin: function() {
      vm.minDate = vm.minDate ? null : new Date();
    },
    dateOpened: false,
    dateOpen: function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.dateOpened = true;
    },
    dateOptions: {
      formatYear: 'yy',
      startingDay: 1
    }
  });

});
