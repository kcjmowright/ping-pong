'use strict';

var Game = require('./game.model');

exports.register = function (socket) {

  Game.schema.post('save', function (doc) {
    socket.emit('Game:save', doc);
  });

  Game.schema.post('remove', function (doc) {
    socket.emit('Game:remove', doc);
  });

};
