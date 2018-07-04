const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const NODE_ENV = process.env.NODE_ENV

var isDev = false

if (NODE_ENV === 'development') isDev = true

const createVueLoaderOptions = require('../config/vue-loader.config.js')

const config = {
    target: 'web',
    entry: {
        main: path.join(__dirname, '../client/entry.js')
    },
    output: {
        filename: 'bundle.[hash:8]js', // 在webpack-dev-server环境下，不能够使用chunk hash
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                use: ['babel-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader', 
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }, 
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg|bmp|svg|tiff)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'assets/images/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../example/index.html')
        }),
        new VueLoaderPlugin()
    ],
    resolve: {}
}

module.exports = config