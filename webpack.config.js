var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var APP_PATH = path.resolve(ROOT_PATH, 'app');
module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'app.jsx')
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/',
  },

  // enable dev source map
  devtool: 'inline-source-map',
  //enable dev server
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false,
        /*rewrite: function(req) {
          req.url = req.url.replace(/^\/api/, '');
        }*/
      }
    }
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: APP_PATH
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: APP_PATH
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: APP_PATH
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }

    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      filename: 'index.html',
      title: 'Btc1.us | Live cryptocurrency prices',
      inject: 'body',
      template: './index.html'
    })
  ]
}
