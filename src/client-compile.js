import ip from 'ip';
import webpack from 'webpack';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import template from 'lodash/string/template';
import assign from 'lodash/object/assign';

Promise.promisifyAll(fs);

function compileWsClient(port) {
  const host = ip.address();
  const src = __dirname + '/ws-client-template.js';
  const dest = __dirname + '/../src/ws-client.js';

  return fs.readFileAsync(src, 'utf-8')
    .then((contents) => template(contents)({ host, port }))
    .then((compiled) => fs.writeFileAsync(dest, compiled, 'utf-8'));
}

function webpackCompile(config) {
  return new Promise((resolve) => webpack(config).run(resolve));
}

export function compile(port) {
  function noop() {}

  const src = path.resolve(__dirname + '/../src');
  const pub = path.resolve(__dirname + '/../public');
  const dist = __dirname;

  const commonConfig = {
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    }
  };

  const remoteConfig = assign({
    entry: src + '/remote.js',
    output: {
      path: pub,
      filename: 'remote.js'
    }
  }, commonConfig);

  const clientConfig = assign({
    entry: src + '/client.js',
    output: {
      path: dist,
      filename: 'client.js'
    }
  }, commonConfig);

  return compileWsClient(port)
    .then(() => Promise.all([
      webpackCompile(remoteConfig),
      webpackCompile(clientConfig)
    ]));
}
