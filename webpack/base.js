const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { version } = require('../package.json');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
        main: path.resolve(__dirname, '../src/index.js')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: [/\.json/, /\.otf/],
                type: 'asset/resource'
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../')
        }),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            'typeof EXPERIMENTAL': JSON.stringify(false),
            'typeof PLUGIN_3D': JSON.stringify(false),
            'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
            'typeof PLUGIN_FBINSTANT': JSON.stringify(false),
            'typeof FEATURE_SOUND': JSON.stringify(true),
            DEBUG: JSON.stringify(false),
            GAME_VERSION: JSON.stringify(version)
          }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
            linkType: 'text/css'
        }),
        new CopyPlugin({
            patterns: [
              {
                from: 'static',
                globOptions: {
                  // asset pack files are imported in code as modules
                  ignore: ['**/*-pack.json', '**/favicons', '**/fonts']
                }
              },
              {
                from: 'static/favicons/'
              }
            ]
          }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
