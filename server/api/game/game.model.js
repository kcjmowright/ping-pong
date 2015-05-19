'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  home: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  visitor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  homeScore: {
    type: Number,
    default: 0
  },
  visitorScore: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('Game', GameSchema);
