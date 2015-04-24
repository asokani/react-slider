var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Path = require('path');

var SCSS_LOADER = "style-loader!css-loader!sass-loader?includePaths[]=" +
    Path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets');

module.exports = function(options) {
    var plugins;
    if (options.env == "production") {
        plugins = [
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    // Because uglify reports so many irrelevant warnings.
                    warnings: false
                }
            })
        ]
    } else {
        plugins = [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    }

    var entry = [
        "./js/App.js"
    ]

    if (options.env != "production") {
        entry.unshift(
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server'
        )
    }

    return {
        entry: entry,
        output: {
            path: __dirname + '/build',
            filename: "bundle.js"
        },
        module: {
            loaders: [
                { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
                { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
                { test: /\.scss$/, loader: SCSS_LOADER },
                { test: /\.css$/, loader: "style!css" },
            ]
        },
        plugins: plugins
    }
}