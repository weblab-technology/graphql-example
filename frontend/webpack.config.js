"use strict";

const webpack = require('webpack');
const path = require('path');
const isDEV = process.env.NODE_ENV === 'development';
const CompressionPlugin = require('compression-webpack-plugin' );
const HTMLPlugin = require( 'html-webpack-plugin' );
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const options = {
  root : __dirname,
  appName : 'GraphQl',
};

function createPlugins() {
  if(isDEV) {
    return [
      new HTMLPlugin({
        inject: true,
        template: path.resolve(options.root, 'src/index.html' ),
        favicon: path.resolve(options.root, 'src/favicon.ico' )
      }),
      new ExtractTextPlugin({ filename: '[name].[contenthash].css', disable: false, allChunks: true }),
      new webpack.NoEmitOnErrorsPlugin()
    ];
  }
  return [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
    }),
    new ExtractTextPlugin({ filename: '[name].[contenthash].css', disable: false, allChunks: true }),
    new HTMLPlugin({
      inject: true,
      template: path.resolve(options.root, 'src/index.html' ),
      favicon: path.resolve(options.root, 'src/favicon.ico' ),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin( ),
    new CompressionPlugin({ test: /\.(js|css|html)$/, threshold: 10240, minRatio: 0.8 }),
    new webpack.NoEmitOnErrorsPlugin( )
  ]
}

const webpackConfig = {
  context: options.root,
  entry: path.resolve(options.root, 'src/index.js'),
  output: {
    path: path.join(options.root, './dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  devtool: !isDEV? false :'inline-source-map',
  watch: isDEV,
  watchOptions: {
    aggregateTimeout: 300
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              }
            },
            'less-loader'
          ]
        })
      }
    ]
  },
  plugins: createPlugins()
};

module.exports = webpackConfig;