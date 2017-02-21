import px2rem from 'postcss-px2rem'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import {
  build
} from '../config'

var isProduction = process.env.NODE_ENV === 'production'
const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: isProduction,
    sourceMap: !isProduction
  }
}
const generateLoaders = loader => {
  var loaders = [cssLoader]
  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: {
        sourceMap: !isProduction
      }
    })
  }
  if (isProduction) {
    return ExtractTextPlugin.extract({
      loader: loaders,
      fallback: 'vue-style-loader'
    })
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
}

export default {
  loaders: {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass'),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    }),
    px2rem({
      remUnit: build.remUnit
    })
  ]
}
