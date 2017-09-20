import webpack from 'webpack'
import Config from 'webpack-config'
import { assetsPath } from './webpack.base.conf'
export default new Config().extend('build/conf/webpack.base.conf.js').merge({
  devtool: 'source-map',
  entry: {
    vendor: ['dva-vue', assetsPath('build/plugins/hot.js')]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})
