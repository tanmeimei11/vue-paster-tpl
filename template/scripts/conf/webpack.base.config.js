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
} from '../../config'
import { styleLoaders, default as cssLoaders } from './vue-loader.conf'
import { aliasObject } from './utils'
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

// 输出无效入口路径
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
      env.assetsPath('node_modules'),
      env.assetsPath('../node_modules')
    ],
    alias: aliasObject
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [env.assetsPath('src'), env.assetsPath('test')],
      exclude: [env.assetsPath('src/assets/libs')],
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
      // css文件引用方式， 
      // 在js中引用使用require('!url-loader?limit=10000!../../assets/images/a1.png')
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]',
        publicPath: '../'
      }
    },
    {
      test: /\.(mp3|mp4)(\?.*)?$/,
      loader: 'file-loader',
      query: {
        name: 'media/[name].[hash:7].[ext]',
        publicPath: './'
      }
    },
    {
      test: /\.pug$/,
      loader: 'pug-loader'
    }
    ].concat(styleLoaders())
  }
}
