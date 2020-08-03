const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/assets/templates/index.html'),
      title: 'react-redux-template',
      mobile: true,
      baseHref: '/',
      favicon: 'src/assets/images/logo.png',
      minify: {
        collapseWhitespace: true,
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
}
