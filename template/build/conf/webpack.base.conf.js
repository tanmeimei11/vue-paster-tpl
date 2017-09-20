import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { postcssPlugins, scssLoader, assetsPath } from './vue-loader.conf'
export { assetsPath } from './vue-loader.conf'
var isProduction = process.env.NODE_ENV === 'production'
const isFontFile = url => /\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(url)
export default {
  entry: {
    'app': [assetsPath('src/entry.js')]
  },
  output: {
    path: assetsPath('dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.[chunkhash:7].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      assetsPath('src'),
      assetsPath('node_modules'),
      assetsPath('../node_modules')
    ],
    alias: Object.assign({}, {

    }, {
      'src': assetsPath('src'),
      'assets': assetsPath('src/assets'),
      'components': assetsPath('src/components'),
      'mixins': assetsPath('src/mixins'),
      'config': assetsPath('src/config')
    })
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [assetsPath('src')],
      exclude: [assetsPath('src/assets/libs')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.js$/,
      include: [assetsPath('src/assets/libs')],
      use: 'imports-loader?this=>window&define=>false'
    },
    {
      test: /\.js?$/,
      use: 'babel-loader',
      include: [assetsPath('src')]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: scssLoader
        },
        postcss: postcssPlugins,
        transformToRequire: {
          audio: 'src',
          video: 'src'
        }
      }
    },
    {
      test: /\.scss?$/,
      use: scssLoader
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]',
        publicPath: '../'
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[hash:7].[ext]',
        outputPath: url => `${isFontFile(url) ? 'fonts' : 'media'}/${url}`,
        publicPath: url => `${isFontFile(url) ? '../' : './'}${url}`
      }
    }]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      DEBUG: !isProduction
    }),
    new ExtractTextPlugin({
      disable: !isProduction,
      allChunks: true,
      filename: 'css/[name].[contenthash:7].css'
    }),
    new HtmlWebpackPlugin({
      minify: isProduction ? {
        html5: false
      } : {},
      chunks: (isProduction ? ['manifest'] : []).concat(['app', 'vendor']),
      filename: `index.html`,
      template: assetsPath('src/tpl.html')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isProduction ? ((module, count) => {
        let res = module.resource
        // any required modules inside node_modules are extracted to vendor
        return res && /\.js$/.test(res) && (~res.indexOf(assetsPath('node_modules')) || ~res.indexOf(assetsPath('src/assets/libs')))
      }) : Infinity
    })
  ]
}
