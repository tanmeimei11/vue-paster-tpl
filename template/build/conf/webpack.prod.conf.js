import webpack from 'webpack'
import Config from 'webpack-config'

export default new Config().extend('build/conf/webpack.base.conf.js').merge({
  output: {
    publicPath: './',
    filename: 'js/[name].[chunkhash:7].js',
    chunkFilename: 'js/[name].chunk.[chunkhash:7].js'
  },
  plugins: [
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
    })
  ]
})
