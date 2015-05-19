'use strict';

var Player = require('./player.model');

exports.register = function (socket) {

  Player.schema.post('save', function (doc) {
    socket.emit('Player:save', doc);
  });

  Player.schema.post('remove', function (doc) {
    socket.emit('Player:remove', doc);
  });

};
