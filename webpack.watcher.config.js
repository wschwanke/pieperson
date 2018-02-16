const webpack = require('webpack');
const { spawn } = require('child_process');

module.exports = {
  output: {
    pathinfo: true
  },
  devtool: '#cheap-module-eval-source-map',
  stats: false,
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  devServer: {
    // https: true,
    open: false,
    host: '0.0.0.0',
    port: 3001,
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    hotOnly: true,
    overlay: {
      warnings: false,
      errors: true
    },
    compress: true,
    public: 'http://localhost:3001',
    proxy: {
      '*': 'http://0.0.0.0:3000'
    },
    setup() {
      spawn(
        'electron',
        ['electron.js'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
      .on('close', code => process.exit(0))
      .on('error', spawnError => console.error(spawnError));
    }
  },
};
