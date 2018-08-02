const path = require('path');
const webpack = require('webpack');
const postcssPresetEnvPlugin = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  host: 'localhost',
  port: 3000,
};
const srcPath = path.join(__dirname, './src');
const jsEntry = path.join(srcPath, 'index.js');

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: true,
    __PROD__: false,
  }),
  new HtmlWebpackPlugin({
    template: path.join(srcPath, 'index.html'),
    inject: true,
  }),
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

const plugins = basePlugins.concat(devPlugins);

module.exports = {
  target: 'web',
  mode: 'development',
  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
  },
  entry: {
    app: jsEntry,
  },
  devtool: 'source-map',
  context: srcPath,
  plugins: plugins,
  devServer: {
    hot: true,
    inline: true,
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
