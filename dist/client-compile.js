'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.compile = compile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ip = require('ip');

var _ip2 = _interopRequireDefault(_ip);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodashStringTemplate = require('lodash/string/template');

var _lodashStringTemplate2 = _interopRequireDefault(_lodashStringTemplate);

_bluebird2['default'].promisifyAll(_fs2['default']);

function compileWsClient(port) {
  var host = _ip2['default'].address();
  var src = __dirname + '/ws-client-template.js';
  var dest = __dirname + '/ws-client.js';

  return _fs2['default'].readFileAsync(src, 'utf-8').then(function (contents) {
    return (0, _lodashStringTemplate2['default'])(contents)({ host: host, port: port });
  }).then(function (compiled) {
    return _fs2['default'].writeFileAsync(dest, compiled, 'utf-8');
  });
}

function webpackCompile(config) {
  return new _bluebird2['default'](function (resolve) {
    return (0, _webpack2['default'])(config).run(resolve);
  });
}

function compile(port) {
  function noop() {}

  var remoteConfig = {
    entry: __dirname + '/remote.js',
    output: {
      path: __dirname + '/../public',
      filename: 'remote.js'
    }
  };

  var clientConfig = {
    entry: __dirname + '/client.js',
    output: {
      path: __dirname,
      filename: 'client-bundle.js'
    }
  };

  return compileWsClient(port).then(function () {
    return _bluebird2['default'].all([webpackCompile(remoteConfig), webpackCompile(clientConfig)]);
  });
}