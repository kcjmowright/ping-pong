'use strict';

var _ = require('lodash');
var moment = require('moment');
var Game = require('./game.model');

function handleError (res, err) {
  console.log(err);
  return res.status(500).send(err);
}

/**
 * Get list of Games
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  var query = Game.find();
  
  if(req.query.startDate){
    if(_.isArray(req.query.startDate)){
      query.where('startDate').gte(moment(req.query.startDate[0]).toDate());
      query.where('startDate').lte(moment(req.query.startDate[1]).toDate());
    } else {
      query.where('startDate').equals(moment(req.query.startDate).toDate());
    }
  }

  if(req.query.endDate){
    if(_.isArray(req.query.endDate)){
      query.where('endDate').gte(moment(req.query.endDate[0]).toDate());
      query.where('endDate').lte(moment(req.query.endDate[1]).toDate());
    } else {
      query.where('endDate').equals(moment(req.query.endDate).toDate());
    }
  }
  
  query.exec(function (err, games) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(games);
  });
};

/**
 * Get a single Game
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.status(404).end();
    }
    return res.status(200).json(game);
  });
};

/**
 * Creates a new Game in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  if(!req.session || !req.session.user){
    return res.status(401).end();
  }
  Game.create(req.body, function (err, game) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(game);
  });
};

/**
 * Updates an existing Game in the DB.
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
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.status(404).end();
    }
    var updated = _.merge(game, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(game);
    });
  });
};

/**
 * Deletes a Game from the DB.
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
  Game.findById(req.params.id, function (err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.status(404).end();
    }
    game.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).end();
    });
  });
};
