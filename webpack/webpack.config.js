const { join } = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const memoryLimit = 2048;

const config = require('./config');

let webpackConfig = {
  context: config.paths.root,

  devtool: (config.enabled.sourceMaps ? 'cheap-module-source-map' : undefined),

  entry: {
    bundle: [
      '@babel/polyfill',
      join(config.paths.root, 'client/entry.tsx'),
      join(config.paths.root, 'client/assets/font-awesome/fontawesome.scss'),
      join(config.paths.root, 'client/assets/font-awesome/regular.scss'),
      join(config.paths.root, 'client/assets/font-awesome/solid.scss'),
      join(config.paths.root, 'client/assets/styles/main.scss'),
    ],
  },

  stats: 'normal',

  mode: config.env.production ? 'production' : 'development',

  performance: {
    hints: false,
  },

  output: {
    path: config.paths.compiled,
    pathinfo: false,
    publicPath: config.paths.public,
    filename: !config.env.production ? 'scripts/[name].js' : 'scripts/[name].[hash].js',
    chunkFilename: !config.env.production ? 'scripts/[name].js' : 'scripts/[name].[hash].js',
  },

  module: {
    rules: [
      {
        test: /\.t(s|sx)$/,
        exclude: [/(node_modules)/, join(config.paths.root, 'server'), join(config.paths.root, 'indexer')],
        use: [
          {
            loader: 'babel-loader'
          },
        ],
      },
      {
        test: /\.(sc|sa)ss$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: config.enabled.watcher,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: config.enabled.sourceMaps
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: join(config.paths.root, '/webpack'),
                ctx: config
              },
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
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps } },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: join(config.paths.root, '/webpack'), ctx: config },
              sourceMap: config.enabled.sourceMaps,
            },
          },
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|ttf|svg|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      "@Assets": join(config.paths.root, 'client/assets'),
      "@Blocks": join(config.paths.root, 'client/blocks'),
      "@Components": join(config.paths.root, 'client/components'),
      "@Layout": join(config.paths.root, 'client/layout'),
      "@Lib": join(config.paths.root, 'client/lib'),
      "@Scenes": join(config.paths.root, 'client/scenes'),
      "@Router": join(config.paths.root, 'client/router'),
      "@Test": join(config.paths.root, 'client/test'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 6,
      maxInitialRequests: 5,
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
    // Removes files from public/dist directory before build
    new HardSourceWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new ForkTsCheckerPlugin({
      tsconfig: join(config.paths.root, 'client', 'tsconfig.json'),
      memoryLimit: memoryLimit,
      checkSyntacticErrors: true,
      async: false,
      watch: [join(config.paths.root, 'client')],
      workers: ForkTsCheckerPlugin.ONE_CPU,
    }),
    new CleanWebpackPlugin([config.paths.clean], {
      root: config.paths.root,
      verbose: false,
    }),
    // new CopyWebpackPlugin([
    //     { from: join(config.paths.root, 'client/assets/fonts'), to: join(config.paths.root, '.build/client/assets/fonts')},
    //     { from: join(config.paths.root, 'client/assets/images'), to: join(config.paths.root, '.build/client/assets/images')},
    //   ]
    // ),
    new ExtractCssChunks(
      {
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: !config.env.production ? 'styles/[name].css' : 'styles/[name].[hash].css',
        chunkFilename: !config.env.production ? 'styles/[name].css' : 'styles/[name].[hash].css',
        hot: true, // if you want HMR - we try to automatically inject hot reloading but if it's not working, add it to the config
        orderWarning: false, // Disable to remove warnings about conflicting order between imports
        reloadAll: true, // when desperation kicks in - this is a brute force HMR flag
      }
    ),
    // Generates an html file that has all the required assets built by webpack injected into it
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../index.html',
      template: join(config.paths.root, 'client/layout/index.html'),
      alwaysWriteToDisk: true,
    }),
    // Creates physical files on the hard disk during webpack-dev-server watch
    new HtmlWebpackHarddiskPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ],

  cache: false,
};

if (config.env.production) {
  webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.watcher) {
  webpackConfig = merge(webpackConfig, require('./webpack.watcher.config.js'));
  webpackConfig = merge(webpackConfig, {
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
  });
}

module.exports = webpackConfig;
