import webpack from 'webpack'
import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import {
  BundleAnalyzerPlugin
} from 'webpack-bundle-analyzer'
import ImageMinPlugin from 'image-min-plugin'
import { env, build } from '../../config'

const cfg = new Config().extend({
  'scripts/conf/webpack.base.conf.js': config => {
    config.plugins = config.plugins || []
    Object.keys(config.entry).forEach(entry => {
      config.plugins.push(
        new HtmlWebpackPlugin({
          chunks: [entry, 'vendor', 'manifest'],
          filename: `${entry}.html`,
          template: `./src/pages/${entry}/${build.entryTpl}`
        }))
    })
    return config
  }
}).merge({
  output: {
    publicPath: './',
    filename: 'js/[name].[chunkhash:7].js'
  },
  plugins: [
    new ImageMinPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify('production'),
      DEBUG: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        let res = module.resource
        // any required modules inside node_modules are extracted to vendor
        return res && /\.js$/.test(res) && (~res.indexOf(env.assetsPath('node_modules')) || ~res.indexOf(env.assetsPath('src/assets/libs')))
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
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
