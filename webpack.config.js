var webpack = require('webpack');  
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Path = require('path');

var SCSS_LOADER = "style-loader!css-loader!sass-loader?includePaths[]=" +
        Path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets');

module.exports = {  
    entry: [
	  'webpack-dev-server/client?http://localhost:8080', // WebpackDevServer host and port
      'webpack/hot/only-dev-server',
      "./js/App.js"
    ],
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
    plugins: [
	  new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]

};