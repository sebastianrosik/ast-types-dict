const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    AST_TYPES_VERSION: JSON.stringify(require("./node_modules/ast-types/package.json").version)
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.js"
  })
];

if (process.env.NODE_ENV !== 'development') {
  plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }));
  plugins.push(new UglifyJSPlugin());
}

module.exports = {
  entry: {
    app: './index.js',
    vendor: ['react']
  },
  output: {
    filename: 'bundle.js',
    publicPath: 'dist',
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
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }
    ]
  },
  plugins
};
