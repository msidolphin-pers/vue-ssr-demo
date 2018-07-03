const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV

var isDev

if (NODE_ENV === 'development') isDev = true
else if (NODE_ENV === 'production') isDev = false
else {
    console.error('node environment is invaild { ' + NODE_ENV + ' }')
    return
}

const config = {
    target: 'web',
    entry: {
        main: path.join(__dirname, 'client/main.js')
    },
    output: {
        filename: 'bundle.[hash:8]js', // 在webpack-dev-server环境下，不能够使用chunk hash
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
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
                            name: 'images/[name].[ext]'
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
            template: path.join(__dirname, 'example/index.html')
        }),
        new VueLoaderPlugin()
    ],
    resolve: {}
}

if (isDev) {
    // 开发环境下，直接使用style-loader将样式表嵌入到页面
    config.module.rules.push({
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
    })
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        hot: true,
        historyApiFallback: {
            index: '/index.html' // 若output配置了publicPath，那么需要加上publicPath作为基路径
            // disableDotRule: true // 解决history模式访问404的问题
        }
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
    config.resolve.alias = {
        'vue': 'vue/dist/vue.js'
    }
} else {
    // 生产环境
    config.entry = {
        app: path.join(__dirname, 'src/main.js'),
        vendor: ['vue'] // 打包类库
    }
    // 使用chunkhash的原因 每一个定义在entry中的元素都是一个chunk
    // 直接使用hash的话entry中的模块都是同一个hash（整个应用，如果业务代码改变了会导致类库文件的hash也会改变）
    config.output.filename  = '[name].[chunkhash:8].js'
    config.module.rules.push({
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
    })
    config.plugins.push(
        new ExtractTextWebpackPlugin('styles.[contentHash:8].css'),
        // 单独打包类库
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // 将webpack相关文件单独打包（就是app.[hash].js中的webpack代码）
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}

module.exports = config