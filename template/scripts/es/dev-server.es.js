import { existsSync, createReadStream } from 'fs'
import { createGzip } from 'zlib'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import httpProxyMiddleware from 'http-proxy-middleware'
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
Object.keys(env.proxyTable).forEach(function (context) {
  var options = env.proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(httpProxyMiddleware(context, options))
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
