const path = require('path');
const webpack = require('webpack');
const postcssPresetEnvPlugin = require('postcss-preset-env');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const config = {
  host: 'localhost',
  port: 3000,
};

const isProduction = process.env.NODE_ENV === 'production';

const distPath = path.join(__dirname, './dist');
const srcPath = path.join(__dirname, './src');
const jsEntry = path.join(srcPath, 'index.js');

const sources = [jsEntry];

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
  }),
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    path: distPath,
    filename: 'index.html',
    inject: 'body',
  }),
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new DashboardPlugin(),
];

const plugins = basePlugins
  .concat(isProduction ? [] : devPlugins);

module.exports = {
  target: 'web',
  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  entry: {
    app: sources,
    vendor: [
      'babel-polyfill',
      'bluebird',
      'clipboard-js',
      'leven',
      'marked',
      'ramda',
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-logger',
      'redux-localstorage',
      'redux-thunk',
      'react-router',
      'react-router-redux',
      'semantic-ui-react',
      'history',
      'immutable',
    ],
  },

  output: {
    path: distPath,
    filename: '[name].[hash].js',
    publicPath: isProduction ? '/treillage/' : '/',
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js',
  },

  optimization: {
    splitChunks: {
      name: 'vendor',
      filename: 'vendor.js',
    },
    minimize: true,
  },

  devtool: isProduction ? false : 'source-map',

  context: jsEntry,

  plugins: plugins,

  devServer: {
    contentBase: distPath,
    hot: !isProduction,
    inline: !isProduction,
    compress: isProduction,
    host: config.host,
    port: config.port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssPresetEnvPlugin({
                stage: 0,
              }),
            ],
          } },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
          {
            loader: 'source-map-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: 'url-loader?prefix=img/&limit=5000',
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'url-loader?prefix=font/&limit=5000',
      },
    ],
  },
};
