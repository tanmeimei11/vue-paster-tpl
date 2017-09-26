import webpack from 'webpack'
import Config from 'webpack-config'
import { assetsPath } from './webpack.base.conf'
export default new Config().extend({'build/conf/webpack.base.conf.js': config => {
  config.entry.vendor = config.entry.vendor.concat(assetsPath('build/plugins/hot.js'))
  return config
}}).merge({
  devtool: 'source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
