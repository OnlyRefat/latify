/***** WARNING: ES5 code only here. Not transpiled! *****/

/**
 * External dependencies
 */
var webpack = require ('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
/**
 * Internal dependencies
 */

/**
 * Internal variables
 */

webpackConfig = {
    /*entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'build.js'
  },*/
    entry: { 
        lite: "./app.js",
    },
    node: {
        __filename: true,
        __dirname: true
    },
    output: { filename: "dist/[name].js" },

    plugins: [ 
        new webpack.optimize.CommonsChunkPlugin("dist/init.js"),
        new WebpackNotifierPlugin({alwaysNotify: true, title: 'Webpack'}),
        // new CopyFromDistToCf7Js(),
     ],
    module: {
    loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                // include: __dirname + '/src',
                include: path.join(__dirname, '/src'),
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-decorators-legacy' ],
                    presets: ['react','es2015', 'stage-0']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules')
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
            // { test: /\.css$/, loader: "style-loader!css-loader" },
        ]
    }
};

module.exports = webpackConfig;
