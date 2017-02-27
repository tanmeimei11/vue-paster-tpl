import webpack from 'webpack'
import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import {
  BundleAnalyzerPlugin
} from 'webpack-bundle-analyzer'
import {
  build
} from '../config'

const cfg = new Config().extend({
  'build/webpack.base.config.js': config => {
    config.plugins = config.plugins || []
    Object.keys(config.entry).forEach(entry => {
      config.plugins.push(
        new HtmlWebpackPlugin({
          chunks: [entry],
          filename: `${entry}.html`,
          template: `./src/pages/${entry}/${build.entryTpl}`
        }))
    })
    return config
  }
}).merge({
  output: {
    publicPath: "./",
    filename: 'js/[name].[chunkhash:7].js'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('production'),
      DEBUG: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:7].css'
    })
  ]
})


if (build.bundleAnalyzerReport) {
  cfg.merge({
    plugins: [new BundleAnalyzerPlugin()]
  })
}

export default cfg
