import { watchFile } from 'fs'
import express from 'express'
import webpack from 'webpack'
import {
  blue
} from 'chalk'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import httpProxyMiddleware from 'http-proxy-middleware'
import contextMatcher from 'http-proxy-middleware/lib/context-matcher'
import cfg from '../conf/webpack.dev.config'
import {
  env
} from '../../config'

const compiler = webpack(cfg)
const port = process.env.PORT || env.port

const koaDevMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    chunks: false
  }
})

const koaHotMiddleware = webpackHotMiddleware(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    koaHotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

/* S - Express */
const app = express()
/** proxy  */
let configJs = env.assetsPath('src/config.js')
let proxyTable = require(configJs).proxyTable
let showProxyInfo = (stats = 'init') => {
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = {
        target: options
      }
    }
    console.log(`${blue(`[HPM] Proxy ${stats}`)} : ${context}  ->  ${options.target}`)
  })
}
showProxyInfo()
watchFile(configJs, () => {
  console.log(`${blue(`[ProxyConfig]`)} 改变`)
  delete require.cache[require.resolve(configJs)]
  proxyTable = require(configJs).proxyTable
  showProxyInfo('modify')
})
app.all('*', (req, res, next) => {
  let shouldProxy = false
  Object.keys(proxyTable).forEach(function (context) {
    if (!shouldProxy) {
      var path = (req.originalUrl || req.url)
      shouldProxy = contextMatcher.match(context, path, req)
      if (shouldProxy) {
        var options = proxyTable[context]
        if (typeof options === 'string') {
          options = {
            target: options
          }
        }
        httpProxyMiddleware(context, options)(req, res, next)
      }
    }
  })
  if (!shouldProxy) next()
})

app.use(koaDevMiddleware)
app.use(koaHotMiddleware)

/* E - Express */
app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  koaDevMiddleware.waitUntilValid(function () {
    console.log(`> Listening at http://localhost:${port}\n`)
  })
})
