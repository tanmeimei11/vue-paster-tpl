import {
  join
} from 'path'

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
  proxyTable: {
    '/promo': {
      target: 'http://58.215.141.112',
      secure: false,
      changeOrigin: true,
      onProxyReq (proxyReq, req, res) {
        proxyReq.setHeader('host', 'www.in66.com')
        // add custom header to request
        // proxyReq.setHeader('cookie', '_aries=7ca3bf90aa13bda853b4cd256e0463ff;tg_auth=e507305b87de478592707f80982cd551');
        // or log the req
      }
    }
  }
}
