import Config from 'webpack-config'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {
  build
} from '../config'
export default new Config().extend({
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
  devtool: '#source-map'
})
