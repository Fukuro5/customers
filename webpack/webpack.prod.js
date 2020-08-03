const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        test: /\.(jsx?)$/,
        uglifyOptions: {
          ecma: 9,
          compress: {
            drop_console: true,
          },
          output: {
            beautify: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[hash:base64]',
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
            },
          },
          {
            loader: 'sass-loader',
            options: {
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
})
