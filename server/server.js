'use strict';

var express = require('express');
var session = require('express-session');
var chalk = require('chalk');
var config = require('./config/environment');
var mongoose = require('mongoose');


mongoose.connect(config.mongo.uri, config.mongo.options);

var app = express();
app.use(session({
  secret: 'christopher walken',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));
var server = require('http').createServer(app);
var socket = require('socket.io')(server, { serveClient: true });
require('./config/sockets.js')(socket);

require('./config/express')(app);
require('./routes')(app);
require('./scoreboard.js');


server.listen(config.port, config.ip, function () {

  console.log(
    chalk.red('\nExpress server listening on port ')
    + chalk.yellow('%d')
    + chalk.red(', in ')
    + chalk.yellow('%s')
    + chalk.red(' mode.\n'),
    config.port,
    app.get('env')
  );

  if (config.env === 'development') {
    require('fs').writeFileSync('.dev-refresh', 'done');
  }

});

module.exports = server;
