const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NODE_ENV === 'development'

const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, '../index.html')
  }),
  new VueClientPlugin()
]

let config

if (!isDev) {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: 'assets/js/[name].[chunkhash:8].js',
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'sass-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPluins.concat([
      new ExtractPlugin('assets/css/styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      new webpack.NamedChunksPlugin()
    ])
  })
}

config.resolve = {
}

module.exports = config
