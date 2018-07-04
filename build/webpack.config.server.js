const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const NODE_ENV = process.env.NODE_ENV

var isProd

if (NODE_ENV === 'production') isProd = true

var config = {}

config = merge(baseConfig, {
  target: 'node',
  devtool: 'source-map',
  entry: {
    main: path.join(__dirname, '../server/main.js')
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.join(__dirname, '../server')
  },
  externals: Object.keys(require('../package.json').dependencies),
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isProd ? 'production' : 'development',
      'process.env.VUE_ENV': 'server'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config