'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodashStringTemplate = require('lodash/string/template');

var _lodashStringTemplate2 = _interopRequireDefault(_lodashStringTemplate);

var _lodashObjectAssign = require('lodash/object/assign');

var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);

_bluebird2['default'].promisifyAll(_fs2['default']);

function compileWsClient(port) {
  var host = _ip2['default'].address();
  var src = __dirname + '/ws-client-template.js';
  var dest = __dirname + '/../src/ws-client.js';

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

  var src = _path2['default'].resolve(__dirname + '/../src');
  var pub = _path2['default'].resolve(__dirname + '/../public');
  var dist = __dirname;

  var commonConfig = {
    module: {
      loaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }]
    }
  };

  var remoteConfig = (0, _lodashObjectAssign2['default'])({
    entry: src + '/remote.js',
    output: {
      path: pub,
      filename: 'remote.js'
    }
  }, commonConfig);

  var clientConfig = (0, _lodashObjectAssign2['default'])({
    entry: src + '/client.js',
    output: {
      path: dist,
      filename: 'client.js'
    }
  }, commonConfig);

  return compileWsClient(port).then(function () {
    return _bluebird2['default'].all([webpackCompile(remoteConfig), webpackCompile(clientConfig)]);
  });
}