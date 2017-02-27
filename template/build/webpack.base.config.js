/* globals ls */
import {
  dirname,
  basename,
  relative
} from 'path'
import {
  yellow
} from 'chalk'
import {
  build,
  env
} from '../config'
import { styleLoaders, default as cssLoaders } from './vue-loader.conf'

let entryObj = {}
let invalidEntry = []

ls(build.entryGlobs).forEach(file => {
  let folder = dirname(file)
  let includLen = ls(folder).filter(file => build.entryRule.includes(basename(file))).length
  if (includLen === build.entryRule.length) {
    entryObj[`${basename(folder)}`] = `./${relative(process.cwd(), file)}`
  } else {
    invalidEntry.push(folder)
  }
})

// 输出无效入口路劲
if (invalidEntry.length) {
  console.log(yellow(
    `  Tip:
    下列目录必须包含 ${build.entryRule.join(',')} 文件
    ${invalidEntry.join('\n')}
    `
  ))
}

export default {
  entry: entryObj,
  output: {
    path: env.assetsPath('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      env.assetsPath('src'),
      env.assetsPath('node_modules')
    ],
    alias: {
      'src': env.assetsPath('src'),
      'assets': env.assetsPath('src/assets'),
      'components': env.assetsPath('src/components'),
      'iConfig': env.assetsPath('src/iconfig')
    }
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [env.assetsPath('src'), env.assetsPath('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: cssLoaders
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [env.assetsPath('src'), env.assetsPath('test'), env.assetsPath('node_modules')]
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
      test: /\.pug$/,
      loader: 'pug-loader'
    }
    ].concat(styleLoaders())
  }
}
