// import path from 'path';
// import dotenv from 'dotenv';
const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

let useMode;
if (process.env.NODE_ENV === 'development') {
  useMode = 'development';
} else if (process.env.NODE_ENV === 'test') {
  useMode = 'test';
} else {
  useMode = 'production';
}
module.exports = {
  entry: path.resolve(__dirname, 'Client/src/index.js'),
  target: 'web',
  output: {
    path: path.join(__dirname, 'Client/dist'),
    filename: 'bundle.js',
  },
  mode: useMode,
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'Client'),
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './Client/src/index.html',
    }),
  ],
};
