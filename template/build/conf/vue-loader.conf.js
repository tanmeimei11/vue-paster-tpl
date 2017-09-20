import { join } from 'path'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { dataDpr, px2rem } from '../plugins/postcss-plugin'
import config from '../../config'
var isProduction = process.env.NODE_ENV === 'production'
const _assetsPath = (...relativePath) => join(__dirname, '../..', ...relativePath)
export const assetsPath = _assetsPath

export const postcssPlugins = [
  dataDpr(),
  autoprefixer({
    browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >= 7.0']
  }),
  px2rem({
    remUnit: config.remUnit
  })
]
export const scssLoader = ExtractTextPlugin.extract({
  fallback: 'vue-style-loader',
  use: [`css-loader?${isProduction ? 'minimize=true' : ''}`, {
    loader: 'sass-loader',
    options: {
      sourceMap: !isProduction,
      includePaths: [_assetsPath('src')],
      data: "@import 'config/mixin';" 
    }
  }]
})
