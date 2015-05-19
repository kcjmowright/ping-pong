#! /usr/bin/env node

var hash = require('./server/api/hash.js');
var args = process.argv.splice(2);
hash.hash(args[0], args[1], function(err, hash){
  console.log(hash);
});