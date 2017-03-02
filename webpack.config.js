const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: './index.js',
        vendor: ['react']
    },
    output: {
        filename: 'bundle.js',
        publicPath: '/public',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
        new webpack.optimize.CommonsChunkPlugin({
          name: "vendor",
          filename: "vendor.js"
        })
    ]
};
