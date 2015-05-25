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

export function compile(port) {
  function noop() {}

  const commonConfig = {
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
      ]
    }
  };

  const remoteConfig = Object.assign({
    entry: __dirname + '/remote.js',
    output: {
      path: __dirname + '/../public',
      filename: 'remote.js'
    }
  }, commonConfig);

  const clientConfig = Object.assign({
    entry: __dirname + '/client.js',
    output: {
      path: __dirname + '/../dist',
      filename: 'client.js'
    }
  }, commonConfig);

  return compileWsClient(port).then(() => {
    webpack(remoteConfig).run(noop);
    webpack(clientConfig).run(noop);
  });
}
