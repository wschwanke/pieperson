const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawnSync } = require('child_process');

const mkcertCA = spawnSync('mkcert', ['-CAROOT']);
const mkcertCADir = mkcertCA.stdout.toString().replace('\n', '');

module.exports = {
  output: {
    pathinfo: true,
  },
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    // https: true,
    stats: {
      all: false,
      colors: true,
      timings: true,
      env: true,
      version: true,
    },
    headers: {
      'access-control-allow-origin': '*',
    },
    open: false,
    host: '0.0.0.0',
    port: 3001,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    hotOnly: true,
    https: {
      key: fs.readFileSync(path.resolve(os.homedir(), '.localhost_ssl/server.key')),
      cert: fs.readFileSync(path.resolve(os.homedir(), '.localhost_ssl/server.crt')),
      ca: fs.readFileSync(path.resolve(mkcertCADir, 'rootCA.pem')),
    },
    overlay: {
      warnings: false,
      errors: true,
    },
    publicPath: '/assets/',
    // Enabled this for Docker on Windows so hotload works.
    watchOptions: {
      poll: false,
    },
    compress: true,
    public: 'http://0.0.0.0',
    proxy: {
      '*': 'http://0.0.0.0:3000',
    },
  },
};
