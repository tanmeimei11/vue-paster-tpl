import { existsSync, createReadStream } from 'fs'
import { createGzip } from 'zlib'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import httpProxyMiddleware from 'http-proxy-middleware'
import cfg from './conf/webpack.dev.config'
import {
  env
} from '../config'


const compiler = webpack(cfg)
const port = process.env.PORT || env.port

const koaDevMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true
  }
})
const koaHotMiddleware = webpackHotMiddleware(compiler)

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
app.use(function (req, res, next) {
  const jsonData = `${process.cwd()}/mock/${req.url.split('?')[0]}.json`
  if (!existsSync(jsonData)) {
    return next()
  }
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Content-Encoding', 'gzip')
  return createReadStream(jsonData).pipe(createGzip()).pipe(res)
})
app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  koaDevMiddleware.waitUntilValid(function () {
    console.log(`> Listening at http://localhost:${port}\n`)
  })
})
