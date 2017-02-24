import postcss from 'postcss'
import px2rem from 'postcss-px2rem'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import {
  build,
  env
} from '../config'

const dataDpr = postcss.plugin('postcss-dataDpr', function (opts) {
  if (typeof opts === 'undefined') {
    opts = {
      test: /dpr/
    }
  }
  const createSelector = (selector, decl, dpr = 2) => {
    decl.value = decl.value.replace(/(\d)PX/, (reg, num) => `${num * dpr}PX`)
    return {
      selector: `[data-dpr="${dpr}"] ${selector}`,
      nodes: [decl]
    }
  }
  return function (root, result) {
    root.walkComments(comment => {
      let declare = comment.next()
      if (/dpr/.test(comment.text) && declare && declare.type == 'decl') {
        root.append(createSelector(comment.parent.selector, declare.clone(), 2))
        root.append(createSelector(comment.parent.selector, declare.clone(), 3))
      }
      comment.remove()
    })
    return result
  }
})

var isProduction = process.env.NODE_ENV === 'production'
const generateLoaders = loader => {
  var loaders = [{
    loader: 'css-loader',
    options: {
      minimize: isProduction,
      sourceMap: !isProduction
    }
  }]
  if (loader) {
    loaders.push({
      loader: loader + '-loader',
      options: {
        sourceMap: !isProduction,
        includePaths: [env.assetsPath('src')],
        data : cat(env.assetsPath('config/mixin.scss')).toString()
      }
    })
  }
  if (isProduction) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: 'vue-style-loader'
    })
  } else {
    return ['vue-style-loader'].concat(loaders)
  }
}

const cssLoaders = {
  loaders: {
    css: generateLoaders(),
    postcss: generateLoaders(),
    sass: generateLoaders('sass'),
    scss: generateLoaders('sass')
  },
  postcss: [
    dataDpr(),
    autoprefixer({
      browsers: ['last 2 versions']
    }),
    px2rem({
      remUnit: build.remUnit
    })
  ]
}


export const styleLoaders = () => {
  var output = []
  var loaders = cssLoaders.loaders
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}


export default cssLoaders
