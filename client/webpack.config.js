const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');
const DIST_PATH = path.resolve(__dirname, '../dist');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/** @type {import('webpack').Configuration} */
const config = {
  mode: 'none',
  entry: [
    'core-js',
    'regenerator-runtime/runtime',
    'jquery-binarytransport',
    path.resolve(SRC_PATH, './index.css'),
    path.resolve(SRC_PATH, './index.jsx'),
  ],
  output: {
    path: DIST_PATH,
    filename: 'scripts/main.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      path: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      $: 'jquery',
      'window.jQuery': 'jquery',
      AudioContext: ['standardized-audio-context', 'AudioContext'],
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/main.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, './index.html'),
      inject: false,
    }),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    contentBase: [PUBLIC_PATH, UPLOAD_PATH],
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
};

module.exports = config;
