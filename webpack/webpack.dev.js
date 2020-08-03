const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[local]__[hash:base64:5]',
                getLocalIdent: (context, localIdentName, localName, options) => {
                  if (context.resourcePath.includes('node_modules')) {
                    return localName;
                  } else {
                    return null;
                  }
                },
              },
              localsConvention: 'camelCaseOnly',
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, '../src/assets/styles/mixins.scss'),
                path.resolve(__dirname, '../src/assets/styles/functions.scss'),
              ],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname,'../src'),
    port: 3000,
    open: true,
    inline: true,
    hot: true,
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: true,
    },
    stats: {
      version: false,
      modules: false,
      assets: false,
      hash: false,
    },
  },
})
