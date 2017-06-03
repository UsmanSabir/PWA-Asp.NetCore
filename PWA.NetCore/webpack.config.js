﻿const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');




module.exports = (env) => {
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const isDevBuild = !(env && env.prod);

    const mainConfig = {
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
            ]
        },
        entry: {
            app:['./Content/js/index.js'],
            vendor: [
                'jquery',
                'bootstrap/dist/js/bootstrap',
                'bootstrap/dist/css/bootstrap.css'
            ]
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'dist'),
            filename: "[name].bundle.js"
        },
        plugins: [
            extractCSS,
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])

    };

    return [mainConfig];
};