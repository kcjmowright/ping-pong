'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./player.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);

router.post('/', controller.create);

router.post('/authenticate', controller.authenticate);
router.post('/logout', controller.logout);

router.put('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
