/** @format */

const webpack = require('webpack');
const { join } = require('path');
const HappyPack = require('happypack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');
const happyThreadPool = HappyPack.ThreadPool({ size: 3 });

/**
 * This checks to see if we are NOT watching with webpack and returns an array where MiniCssExtractPlugin
 * is loaded before our happypack loader so it doesn't cause an error.
 */
function isWatchingHappyStylesRules(happyId) {
  if (!config.enabled.watcher) {
    return [MiniCssExtractPlugin.loader, 'happypack/loader?id='.concat(happyId)]
  }
  return 'happypack/loader?id='.concat(happyId);
}

/**
 * This checks to see if we are watching with webpack and then unshifts style-loader to the front of our loaders
 * so css is injected into our browser.
 */
function isWatchingHappyStylesPlugins(loaders) {
  if (config.enabled.watcher) {
    return [{ loader: 'style-loader' }].concat(loaders);
  }
  return loaders;
}

let webpackConfig = {
  context: config.paths.root,

  devtool: (config.enabled.sourceMaps ? 'cheap-module-source-map' : undefined),

  entry: {
    bundle: [
      join(config.paths.root, 'client/index.tsx'),
      join(config.paths.root, 'client/assets/styles/main.scss'),
    ],
  },

  stats: 'normal',

  mode: config.env.production ? 'production' : 'development',

  performance: {
    hints: false,
  },

  output: {
    path: config.paths.dist,
    pathinfo: false,
    publicPath: config.paths.public,
    filename: !config.env.production ? 'scripts/[name].js' : 'scripts/[name].[hash].js',
    chunkFilename: !config.env.production ? 'scripts/[name].js' : 'scripts/[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/bower_components/, /node_modules/],
        use: 'happypack/loader?id=ts'
      },
      {
        test: /\.tsx$/,
        exclude: [/bower_components/, /node_modules/],
        use: 'happypack/loader?id=tsx'
      },
      {
        test: /\.(sc|sa)ss$/,
        exclude: /node_modules/,
        use: isWatchingHappyStylesRules('scss')
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: isWatchingHappyStylesRules('css')
      },
    ],
  },

  resolve: {
    alias: {
      blocks: join(config.paths.root, 'client/blocks'),
      components: join(config.paths.root, 'client/components'),
      layout: join(config.paths.root, 'client/layout'),
      lib: join(config.paths.root, 'client/lib'),
      scenes: join(config.paths.root, 'client/scenes'),
      router: join(config.paths.root, 'client/router'),
      state: join(config.paths.root, 'client/state'),
      test: join(config.paths.root, 'client/test'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          reuseExistingChunk: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          enforce: true,
        },
      },
    },
  },

  target: 'web',

  plugins: [
    // Build caching plugin for webpack
    new HardSourceWebpackPlugin(),
    new ForkTsCheckerPlugin({
      memoryLimit: 512,
      checkSyntacticErrors: true,
      async: false,
      tsconfig: join(config.paths.root, 'client'),
      watch: [join(config.paths.root, 'client')],
      workers: ForkTsCheckerPlugin.ONE_CPU,
    }),
    // Removes files from public/dist directory before build
    new CleanWebpackPlugin([config.paths.dist], {
      root: config.paths.root,
      verbose: false,
    }),
    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            babelrc: false,
            plugins: ['@babel/plugin-syntax-dynamic-import', 'react-hot-loader/babel'],
          },
        },
        {
          loader: 'ts-loader',
          options: {
            experimentalFileCaching: true,
            transpileOnly: true,
            happyPackMode: true,
          },
        },
      ],
    }),
    new HappyPack({
      id: 'tsx',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            babelrc: false,
            plugins: ['@babel/plugin-syntax-dynamic-import', 'react-hot-loader/babel'],
          },
        },
        {
          loader: 'ts-loader',
          options: {
            experimentalFileCaching: true,
            transpileOnly: true,
            happyPackMode: true,
          },
        },
      ],
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: isWatchingHappyStylesPlugins([
        { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps } },
        {
          loader: 'postcss-loader',
          options: {
            config: { path: join(config.paths.root, '/webpack'), ctx: config },
            sourceMap: config.enabled.sourceMaps,
          },
        },
      ]),
    }),
    new HappyPack({
      id: 'scss',
      threadPool: happyThreadPool,
      loaders: isWatchingHappyStylesPlugins([
        { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps } },
        {
          loader: 'postcss-loader',
          options: {
            config: { path: join(config.paths.root, '/webpack'), ctx: config },
            sourceMap: config.enabled.sourceMaps,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: [
              join(config.paths.root, '/node_modules'),
            ],
            sourceMap: config.enabled.sourceMaps,
          },
        },
      ]),
    }),
    // Copies all the images from the assets folder and moves them to the public folder
    new CopyWebpackPlugin(
      [
        {
          context: join(config.paths.assets, 'images'),
          from: '**/*',
          to: join(config.paths.root, 'public/dist/images'),
          flatten: true,
        },
        {
          context: join(config.paths.assets, 'fonts'),
          from: '**/*',
          to: join(config.paths.root, 'public/dist/fonts'),
          flatten: true,
        },
      ],
      {
        copyUnmodified: true,
      },
    ),
    // Extracts the css from webpack and saves it as a file in public/dist
    new MiniCssExtractPlugin({
      filename: !config.env.production ? 'styles/[name].css' : 'styles/[name].[hash].css',
      chunkFilename: !config.env.production ? 'styles/[name].css' : 'styles/[name].[hash].css',
    }),
    // Generates an html file that has all the required assets built by webpack injected into it
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../_index.html',
      template: join(config.paths.root, 'client/index.html'),
      alwaysWriteToDisk: true,
    }),
    // Creates physical files on the hard disk during webpack-dev-server watch
    new HtmlWebpackHarddiskPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],

  cache: false,
};

if (config.enabled.linting) {
  webpackConfig.module.rules.push(require('./webpack.linter.config.js'));
}

if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.watcher) {
  webpackConfig = merge(webpackConfig, require('./webpack.watcher.config.js'));
}

module.exports = webpackConfig;
