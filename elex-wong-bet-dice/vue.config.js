const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  outputDir: 'dist',
  productionSourceMap: false,
  chainWebpack: config => {
    
  },

  configureWebpack: config => {
    config.resolve.fallback = {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify")
    };

    config.plugins.push(new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['@popperjs/core', 'default']
    }));

    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        //threshold: 10240,
        //minRatio: 0.8,
        deleteOriginalAssets: false
      }));

      config.optimization = {
        minimize: true,
        minimizer: [new TerserPlugin()],
      };
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
}
