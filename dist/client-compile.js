'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

exports.compile = compile;

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

function compile(port) {
  function noop() {}

  var commonConfig = {
    module: {
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
    }
  };

  var remoteConfig = _Object$assign({
    entry: __dirname + '/remote.js',
    output: {
      path: __dirname + '/../public',
      filename: 'remote.js'
    }
  }, commonConfig);

  var clientConfig = _Object$assign({
    entry: __dirname + '/client.js',
    output: {
      path: __dirname + '/../dist',
      filename: 'client.js'
    }
  }, commonConfig);

  return compileWsClient(port).then(function () {
    (0, _webpack2['default'])(remoteConfig).run(noop);
    (0, _webpack2['default'])(clientConfig).run(noop);
  });
}