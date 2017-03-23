var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var APP_PATH = path.resolve(ROOT_PATH, 'app');
module.exports= {
  entry: {
    app: path.resolve(APP_PATH, 'app.jsx'),
    vendors: ['react', 'react-dom']
  },
  output: {
    path: BUILD_PATH,
    publicPath: 'https://on7nmjfdn.qnssl.com',
    filename: '[name]-[hash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: APP_PATH
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: APP_PATH
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
        //loaders: ['style', 'css', 'sass']
      }, {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      }

    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name]-[hash].js'),
    new ExtractTextPlugin('bundle-[chunkhash].css', {
        allChunks: true
    }),
    new HtmlwebpackPlugin({
      filename: 'index.html',
      title: 'Btc.us | simple bitcoin calculator',
      inject: 'body',
      template: './index.html'
    })
  ]
}
