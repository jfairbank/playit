import ip from 'ip';
import webpack from 'webpack';
import Promise from 'bluebird';
import fs from 'fs';
import template from 'lodash/string/template';

Promise.promisifyAll(fs);

function compileWsClient(port) {
  const host = ip.address();
  const src = __dirname + '/ws-client-template.js';
  const dest = __dirname + '/ws-client.js';

  return fs.readFileAsync(src, 'utf-8')
    .then((contents) => template(contents)({ host, port }))
    .then((compiled) => fs.writeFileAsync(dest, compiled, 'utf-8'));
}

function webpackCompile(config) {
  return new Promise((resolve) => webpack(config).run(resolve));
}

export function compile(port) {
  function noop() {}

  const remoteConfig = {
    entry: __dirname + '/remote.js',
    output: {
      path: __dirname + '/../public',
      filename: 'remote.js'
    }
  };

  const clientConfig = {
    entry: __dirname + '/client.js',
    output: {
      path: __dirname,
      filename: 'client-bundle.js'
    }
  };

  return compileWsClient(port)
    .then(() => Promise.all([
      webpackCompile(remoteConfig),
      webpackCompile(clientConfig)
    ]));
}
