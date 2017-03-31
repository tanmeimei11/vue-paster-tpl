import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import cfg from './scripts/conf/webpack.dev.config'
const compiler = webpack(cfg)
const koaDevMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    chunks: false
  }
})

const koaHotMiddleware = webpackHotMiddleware(compiler)
  // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    koaHotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

module.exports = {
  basePath: __dirname,
  mockFolder: 'mocks',
  routeFile: 'route.js',
  port: 8018,
  livereload: true,
  proxy: {
    '/promo': {
      target: 'http://qa.in66.com',
      secure: false,
      changeOrigin: true,
      onProxyReq(proxyReq, req, res) {
        // add custom header to request
        // proxyReq.setHeader('cookie', '_aries=7ca3bf90aa13bda853b4cd256e0463ff;tg_auth=e507305b87de478592707f80982cd551');
        // or log the req
      }
    }
  },
  middlewares: [koaDevMiddleware, koaHotMiddleware]
}
