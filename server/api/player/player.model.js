'use strict';

var mongoose = require('mongoose');
var hash = require('../hash.js');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  rfid: String,
  name: String,
  hash: String,
  firstName: String,
  lastName: String,
  avatar: String,
  admin: {
    type: Boolean,
    default: false
  }
});

PlayerSchema.pre('save', function(next){
  var player = this;
  if(player.hash){
    hash.hash(player.hash, player.rfid, function(err, hash){
      player.hash = hash;
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('Player', PlayerSchema);
