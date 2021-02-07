const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');
const DIST_PATH = path.resolve(__dirname, '../dist');

/** @type {import('webpack').Configuration} */
module.exports = (env, argv) => {
  return {
    mode: 'production',
    entry: [path.resolve(SRC_PATH, './index.jsx')],
    // entry: path.resolve(SRC_PATH, 'index.jsx'),
    output: {
      path: DIST_PATH,
      filename: '[name].bundle.js',
      // chunkFilename: '[name].bundle.js',
      // publicPath: path.resolve(__dirname, 'dist'),
      // filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      fallback: {
        fs: false,
        path: false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        AudioContext: ['standardized-audio-context', 'AudioContext'],
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css',
        chunkFilename: '[id].css',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(SRC_PATH, './index.html'),
        inject: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)$/,
          include: SRC_PATH,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      targets: {
                        browsers: ['last 1 Chrome version'],
                      },
                      // "targets": {
                      //   "node": "12"
                      // }
                    },
                  ],
                  '@babel/preset-react',
                ],
              },
            },
          ],
        },
        {
          test: /\.(svg|eot|ttf|woff|woff2)$/,
          include: PUBLIC_PATH,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          exclude: /node_modules/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader', options: { url: false } },
            { loader: 'postcss-loader' },
          ],
        },
      ],
    },

    optimization: {
      minimize: true,
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        // `...`,
        new CssMinimizerPlugin(),
      ],
    },

    // entry: path.resolve(__dirname, 'src', 'index.jsx'),
    // entry: [
    //   'core-js',
    //   'regenerator-runtime/runtime',
    //   path.resolve(SRC_PATH, './index.jsx'),
    //   path.resolve(SRC_PATH, './index.css'),
    // ],
    // output: {
    //   path: DIST_PATH,
    //   filename: '[name].bundle.js',
    // },
    // optimization: {
    //   splitChunks: {
    //     name: 'vendor',
    //     chunks: 'initial',
    //   },
    // },
    // resolve: {
    //   extensions: ['.js', '.jsx'],
    //   fallback: {
    //     fs: false,
    //     path: false,
    //   },
    // },
    // module: {
    //   rules: [
    //     {
    //       test: /\.jsx?$/,
    //       exclude: /node_modules/,
    //       use: [
    //         {
    //           loader: 'babel-loader',
    //         },
    //       ],
    //     },
    // {
    //   test: /\.css$/i,
    //   exclude: /node_modules/,
    //   use: [
    //     { loader: MiniCssExtractPlugin.loader },
    //     { loader: 'css-loader', options: { url: false, modules: true } },
    //     { loader: 'postcss-loader' },
    //   ],
    // },
    //   ],
    // },
    // plugins: [
    // new webpack.ProvidePlugin({
    //   Buffer: ['buffer', 'Buffer'],
    //   AudioContext: ['standardized-audio-context', 'AudioContext'],
    // }),
    // new webpack.EnvironmentPlugin({
    //   NODE_ENV: 'production',
    // }),
    //   new MiniCssExtractPlugin({
    //     filename: 'styles/main.css',
    //   }),
    //   new HtmlWebpackPlugin({
    //     template: path.resolve(SRC_PATH, './index.html'),
    //     inject: false,
    //   }),
    // ],
    devtool: false,
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
};
