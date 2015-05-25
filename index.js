#!/usr/bin/env node

var yargs = require('yargs');
var fs = require('fs');
var cp = require('copy-paste');
var Promise = require('bluebird');

var argv = yargs
  .command('start', 'Start the playit servers', function(yargs) {
    argv = yargs
      .option('p', {
        description: 'WebSocket server port',
        alias: 'port',
        default: 3000
      })
      .option('httpPort', {
        description: 'HTTP port for remote Play/Pause',
        default: 8080
      })
      .help('h')
      .argv;
  })
  .command('client', 'Copy the generated client code to the clipboard. ' +
                     '(You must run `playit start` first to generate client code.)')
  .help('h')
  .argv;

var command = argv._[0];

Promise.promisifyAll(fs);

function startServer(wsPort, httpPort) {
  var server = require('./dist/server');
  return server.start(wsPort, httpPort);
}

function copyToCliboard(data) {
  return new Promise(function(resolve) {
    cp.copy(data, resolve);
  });
}

function copyClientCode() {
  var filename = __dirname + '/dist/client-bundle.js';

  fs.readFileAsync(filename, 'utf-8')
    .then(copyToCliboard)
    .then(function() {
      console.log('Contents of client code copied to clipboard. Paste ' +
                  'into devtools on your music website.');
    });
}

switch (command) {
  case 'start':
    startServer(argv.port, argv.httpPort)
      .then(copyClientCode);
    break;

  case 'client':
    copyClientCode();
    break;

  default:
    console.log(yargs.help());
}
