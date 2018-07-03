// const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

const NODE_ENV = process.env.NODE_ENV
var isDev

if (NODE_ENV === 'development') isDev = true

var config = {}

if (isDev) {
  config = merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    devServer: {
      port: 8000,
      host: '0.0.0.0',
      hot: true,
      historyApiFallback: {
        index: '/index.html'
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
      alias: {
        'vue': 'vue/dist/vue.js'
      }
    }
  })
} else {
  throw new Error('current environment is not development')
}

module.exports = config