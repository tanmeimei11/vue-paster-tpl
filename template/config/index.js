import {
  join
} from 'path'
import { proxyTable } from '../src/config'

export const build = {
  entryGlobs: 'src/pages/**/entry.js',
  entryTpl: 'tpl.pug',
  entryRule: ['entry.js', 'tpl.pug'],
  remUnit: 75,
  imgRegx: {
    compress: ['src/assets/img/**/**.*', 'src/assets/qiniu/**/**.*'],
    qiniu: ['src/assets/qiniu/**/**.*']
  },
  bundleAnalyzerReport: process.env.npm_config_report
}

export const env = {
  assetsPath: dir => join(__dirname, '..', dir),
  port: 8018,
  autoOpenBrowser: true,
  proxyTable: proxyTable 
}
