'use strict';

var _ = require('lodash');
var hash = require('../hash.js');
var Player = require('./player.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Player
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Player.find(function (err, players) {
    if (err) {
      return handleError(res, err);
    }
    _.each(players, function(player){
      player.hash = '';
    });
    return res.status(200).json(players);
  });
};

/**
 * Get a single Player
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Player.findById(req.params.id, function (err, player) {
    if (err) {
      return handleError(res, err);
    }
    if (!player) {
      return res.status(404).end();
    }
    player.hash = '';
    return res.status(200).json(player);
  });
};

/**
 * Creates a new Player in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  if(!req.session || !req.session.user){
    return res.status(401).end();
  }
  if(!req.session.user.admin){
    req.body.admin = false;
  }
  Player.create(req.body, function (err, player) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(player);
  });
};

/**
 * Updates an existing Player in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if(!req.session || !req.session.user){
    return res.status(401).end();
  }
  if (req.body._id) {
    delete req.body._id;
  }
  Player.findById(req.params.id, function (err, player) {
    if (err) {
      return handleError(res, err);
    }
    if (!player) {
      return res.status(404).end();
    }
    if(!req.session.user.admin){
      if(req.session.user._id !== req.body._id){
        return res.status(403).end();
      }
      req.body.admin = false;
    }
    var updated = _.merge(player, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(player);
    });
  });
};

/**
 * Deletes a Player from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  if(!req.session || !req.session.user){
    return res.status(401).end();
  }
  if(!req.session.user.admin){
    return res.status(403).end();
  }
  Player.findById(req.params.id, function (err, player) {
    if (err) {
      return handleError(res, err);
    }
    if (!player) {
      return res.status(404).end();
    }
    player.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).end();
    });
  });
};

exports.authenticate = function(req, res){
  if(req.session && req.session.user){
    return res.status(200).json(req.session.user);
  }
  var credentials = req.body;
  if(!credentials || !credentials.username || !credentials.password){
    return handleError(res, new Error('invalid credentials'));
  }
  Player.findOne ({name: credentials.username}, function(err, player) {
    if (!player || err) {
      return handleError(res, new Error('invalid credentials'));
    }
    hash.hash(credentials.password, player.rfid, function(err, hash){
      if (err){
        return handleError(res, err);
      }
      if (hash == player.hash) {
        req.session.regenerate(function(){
          player.hash = '';
          req.session.user = player;
          return res.status(200).json(player);
        });
      } else {
        return handleError(res, new Error('invalid credentials'));
      }
    });
  });

};

exports.logout = function(req, res){
  req.session.destroy(function(err) {
    if(err){
      return handleError(res, new Error('invalid'));
    }
    return res.status(204).end();
  })
};
