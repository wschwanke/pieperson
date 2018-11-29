const webpack = require('webpack');

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
    overlay: {
      warnings: false,
      errors: true,
    },
    publicPath: '/dist/',
    // Enabled this for Docker on Windows so hotload works.
    watchOptions: {
      poll: false,
    },
    compress: true,
    public: 'http://0.0.0.0:3001',
    proxy: {
      '*': 'http://0.0.0.0:3000',
    },
  },
};
