'use strict';

angular.module('pingpong')
  .controller('HomeCtrl', function ($scope, Game, Player, Socket, toast) {

    var vm = this;
    
    /**
     * @params games
     */
    function handleGameWatch(games){
      var now = moment(),
        tomorrow = moment({ hour: 0, date: now.date() + 1});
        
      vm.currentGame = _.find(games, function(game){
        return moment(game.startDate).isBefore(now) && !game.endDate;
      });
      vm.gamesAfterToday = _.filter(games, function(game){
        return moment(game.startDate).isAfter(tomorrow) && !game.endDate;
      });
      vm.gamesLaterToday = _.filter(games, function(game){
        return moment(game.startDate).isBetween(now, tomorrow) && !game.endDate;
      });
      vm.gamesEarlierToday = _.filter(games, function(game){
        return moment(game.endDate).isBefore(now) && !!game.endDate;
      });
    }
    
    /**
     * 
     * @params games
     */
    function handleGames(games) {
      Socket.syncModel('Game', vm.games);
      $scope.$watchCollection(function(){
        return vm.games;
      }, handleGameWatch);        
      return games;      
    }
    
    function handleGamesError() {
      toast.addErrorMessage('Unable to retrieve games');
    }

    function handlePlayers(){
      vm.playerMap = _.indexBy(vm.players, '_id');
      vm.players = _.sortBy(vm.players, 'name');      
    }
    
    angular.extend(vm, {
      currentGame: null,
      gamesEarlierToday: [],
      gamesLaterToday: [],
      gamesAfterToday: [],
      games: Game.query({},{
        startDate: moment({ hour: 0 }).toDate()
      }, handleGames, handleGamesError),
      playerMap: {},
      players: Player.query({}, handlePlayers),
      playerById: function(id){
        return vm.playerMap[id];
      }
    });

  });
