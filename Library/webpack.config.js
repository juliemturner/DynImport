//entry can be an array and an include multiple files
const webpack = require('webpack');
const path = require('path');
const bundleAnalyzer = require('webpack-bundle-analyzer');

const dropPath = path.join(__dirname, 'temp', 'stats');
const lastDirName = path.basename(__dirname);

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    testLibrary: path.resolve(__dirname, './lib/index.js')
  },
  plugins: [
    new bundleAnalyzer.BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: path.join(dropPath, `${lastDirName}.stats.html`),
      generateStatsFile: true,
      statsFilename: path.join(dropPath, `${lastDirName}.stats.json`),
      logLevel: 'error'
    })
  ],
  experiments: {
    outputModule: true,
  },
  output: {
    filename: "[name].js",
    library: {
      type: 'amd',
    },
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "lib")
    ],
  },
  module: {
    rules: [{
      test: /\.css$/,
      exclude: /node_modules/,
      use: ["style-loader", "css-loader"]
    }]
  },
  externals: ['react', 'react-dom']
};