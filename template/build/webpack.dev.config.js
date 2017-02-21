import webpack from 'webpack'
import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {
  build
} from '../config'
export default new Config().extend({
  'build/webpack.base.config.js': config => {
    config.plugins = config.plugins || []
    Object.keys(config.entry).forEach(entry => {
      // config.entry[entry] = ['webpack-hot-middleware/client'].concat(config.entry[entry])
      config.plugins.push(
        new HtmlWebpackPlugin({
          chunks: ['vendor', entry],
          filename: `${entry}.html`,
          template: `./src/pages/${entry}/${build.entryTpl}`
        }))
    })
    return config
  }
}).merge({
  entry: {
    vendor: ['vue', 'webpack-hot-middleware/client']
  },
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ]
})
