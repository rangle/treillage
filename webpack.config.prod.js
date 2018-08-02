const path = require('path');
const webpack = require('webpack');

const config = {
  host: 'localhost',
  port: 3000,
};

const distPath = path.join(__dirname, './dist');
const srcPath = path.join(__dirname, './src');
const jsEntry = path.join(srcPath, 'index.js');

const basePlugins = [
  new webpack.DefinePlugin({
    __PRODUCTION__: true,
  }),
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    inject: true,
  }),
];

module.exports = {
  target: 'web',
  mode: isProduction ? 'production' : 'development',
  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  entry: {
    app: jsEntry,
    vendor: [
      '@babel/polyfill',
      'bluebird',
      'clipboard-js',
      'leven',
      'marked',
      'ramda',
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'redux-localstorage',
      'redux-thunk',
      'react-router',
      'connected-react-router',
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
  devtool: false,
  context: srcPath,
  plugins: basePlugins,

  devServer: {
    contentBase: distPath,
    compress: true,
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
