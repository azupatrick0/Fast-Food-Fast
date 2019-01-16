const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

dotenv.config();

module.exports = {
  entry: path.resolve(__dirname, 'Client/src'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpg|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASE_URL_DEV': JSON.stringify(process.env.BASE_URL_DEV),
      'process.env.BASE_URL_PROD': JSON.stringify(process.env.BASE_URL_PROD),
    }),
    new HtmlWebpackPlugin({
      template: './Client/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
  ],
  resolve: {
    extensions: ['.js', '.css', '.jpg', '.png']
  },
};
