import {
  dirname,
  basename,
  relative,
  join
} from 'path'
import {
  build
} from '../config'
import vueLoaderConfig from './vue-loader.conf'

let entryObj = {}
let invalidEntry = []

const resolve = dir => join(__dirname, '..', dir)

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
  console.log(
    `  Tip:
    下列目录必须包含 ${build.entryRule.join(',')} 文件
    ${invalidEntry.join('\n')}
    `
  )
}

export default {
  entry: entryObj,
  output: {
    libraryTarget: 'umd',
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    {
      test: /\.pug$/,
      loader: 'pug-loader'
    }
    ]
  }
}
