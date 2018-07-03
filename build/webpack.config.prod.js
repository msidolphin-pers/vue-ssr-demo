const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV

var isProd

if (NODE_ENV === 'production') isProd = true

var config = {}

if (isProd) {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/main.js'),
      vendor: ['vue'] // 打包类库
    },
    output: {
      // 使用chunkhash的原因 每一个定义在entry中的元素都是一个chunk
      // 直接使用hash的话entry中的模块都是同一个hash（整个应用，如果业务代码改变了会导致类库文件的hash也会改变）
      filename: 'assets/js/[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/,
          use: ExtractTextWebpackPlugin.extract({
              fallback: 'style-loader',
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
    plugins: [
      new ExtractTextWebpackPlugin('assets/styles/styles.[contentHash:8].css'),
      // 单独打包类库
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
      }),
      // 将webpack相关文件单独打包（就是app.[hash].js中的webpack代码）
      new webpack.optimize.CommonsChunkPlugin({
          name: 'runtime'
      })
    ]
  })
} else {
  throw new Error('current environment is not production')
}

module.exports = config