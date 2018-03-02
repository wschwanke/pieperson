// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
const webpack = require('webpack');
const { join } = require('path');
const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./config');


let webpackConfig = {
  context: config.paths.root,

  devtool: (config.enabled.sourceMaps ? '#source-map' : undefined),

  entry: {
    main: config.entry.main,
  },

  output: {
    path: config.paths.dist,
    publicPath: config.paths.public,
    filename: 'scripts/[name].js',
  },

  stats: {
    hash: false,
    version: false,
    timings: false,
    children: false,
    errors: false,
    errorDetails: false,
    warnings: false,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/bower_components/, /node_modules/],
        loader: ['cache-loader', 'babel-loader'],
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        // include: config.paths.assets,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'cache-loader' },
            { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps } },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: __dirname, ctx: config },
                sourceMap: config.enabled.sourceMaps,
              },
            },
          ],
        }),
      },
      {
        test: /\.scss?$/,
        exclude: /node_modules/,
        // include: config.paths.assets,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'cache-loader' },
            { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps } },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: __dirname, ctx: config },
                sourceMap: config.enabled.sourceMaps,
              },
            },
            { loader: 'sass-loader', options: { includePaths: [__dirname + '/node_modules'], sourceMap: config.enabled.sourceMaps } },
          ],
        }),
      },
    ],
  },

  resolve: {
    alias: {
      Services: join(config.paths.root, 'app/services'),
    },
    extensions: ['.js', '.jsx'],
  },

  target: 'web',

  plugins: [
    new CleanWebpackPlugin([config.paths.dist], {
      root: config.paths.root,
      verbose: false,
    }),
    new CopyWebpackPlugin([
      {
        context: join(config.paths.assets, 'images'),
        from: '**/*',
        to: join(config.paths.root, 'server/public/dist/images'),
        flatten: true,
      },
    ],
    {
      copyUnmodified: true,
    }),
    new ExtractTextPlugin({
      filename: 'styles/main.css',
      allChunks: true,
      disable: (config.enabled.watcher),
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],

  cache: false,
};

if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

if (config.enabled.watcher) {
  webpackConfig.entry = config.entry.hotReload;
  webpackConfig = merge(webpackConfig, require('./webpack.watcher.config.js'));
}

module.exports = webpackConfig;
