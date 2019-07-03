const webpack = require('webpack')
const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'feat-utils': path.resolve(__dirname, './src/index.js')
  },
  output: {
      path: path.resolve(__dirname + '/dist'),
      filename: '[name].js',
      library: 'feat-utils',
      libraryTarget: 'umd',
      globalObject: 'this'    // To make UMD build available on both browsers and Node.js, set output.globalObject option to 'this'.
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
          ]
        }
      }
    }]
  }
}

