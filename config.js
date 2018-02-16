const path = require('path');
const argv = require('minimist')(process.argv.slice(2));
const merge = require('webpack-merge');

const isProduction = !!((argv.env && argv.env.production) || argv.p);
const isWatching = !!(argv.w);

const rootPath = process.cwd();

const config = {
  paths: {
    root: rootPath,
    assets: path.join(rootPath, 'app/assets'),
    public: '/dist/',
    dist: path.join(rootPath, 'server/public/dist')
  },
  enabled: {
    watcher: isWatching,
    optimize: isProduction,
    sourceMaps: !isProduction
  },
  entry: {
    hotReload: [
      'react-hot-loader/patch',
      path.join(rootPath, 'app/hotReload.js'),
      path.join(rootPath, 'app/assets/styles/main.scss')
    ],
    main: [
      path.join(rootPath, 'app'),
      path.join(rootPath, 'app/assets/styles/main.scss')
    ]
  }
};

module.exports = merge(config, {
  env: Object.assign({
    production: isProduction,
    development: !isProduction
  },
  argv.env)
});


if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = isProduction ? 'production' : 'development';
}
