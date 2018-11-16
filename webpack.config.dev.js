var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
let config = {
    mode: 'development',
    entry: {
        main: ['./src/stylesheets/app.scss', './src/scripts/main.js']
    },
    watch: true,
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['eslint-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('autoprefixer')({
                                    browsers: ['last 2 versions', 'ie > 8']
                                }),
                            ]
                        }
                    },
                    'sass-loader',
                ]

            },
            {
                test: /\.(ico|jpg|mp4|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/template/index.html',
            inject: 'body'
        }),
        new CopyWebpackPlugin([
            { from: 'static' },
        ])
    ],

};

module.exports = config;