const { join } = require('path');
const config = require('./config');

module.exports = {
  test: /\.ts(x?)$/,
  exclude: [/bower_components/, /node_modules/],
  enforce: 'pre',
  use: [
    {
      loader: 'tslint-loader',
      options: {
        configFile: join(config.paths.root, 'tslint.json'),
        emitErrors: true,
        fix: false,
        tsConfigFile: join(config.paths.root, 'tsconfig.json'),
      }
    },
  ],
};
