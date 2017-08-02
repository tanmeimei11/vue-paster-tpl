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
import {
  styleLoaders,
  default as cssLoaders
} from './vue-loader.conf'
import {
  aliasObject
} from './utils'
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
const isFontFile = url => /\.(woff2?|eot|ttf|otf)(\?.*)?$/.test(url)
export default {
  entry: entryObj,
  profile: false,
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
      exclude: [env.assetsPath('src', 'assets', 'libs')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.js$/,
      include: [env.assetsPath('src', 'assets', 'libs')],
      use: 'imports-loader?this=>window&define=>false'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: cssLoaders
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [env.assetsPath('src'), env.assetsPath('test'), env.assetsPath('node_modules')],
      exclude: [
        env.assetsPath('src', 'assets', 'libs'), 
        env.assetsPath('node_modules', 'core-js')
      ]
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
    },
    {
      test: /\.pug$/,
      loader: 'pug-loader'
    }
    ].concat(styleLoaders())
  }
}
