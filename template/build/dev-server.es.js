// import {
//   PassThrough
// } from 'stream'
// import Koa from 'koa'
import { networkInterfaces } from 'os'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import httpProxyMiddleware from 'http-proxy-middleware'
import cfg from './webpack.dev.config'
import {
  env
} from '../config'

// console.log(networkInterfaces())

const compiler = webpack(cfg)
const port = process.env.PORT || env.port

const koaDevMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
})
const koaHotMiddleware = webpackHotMiddleware(compiler)

/* S - Koa */
// const app = new Koa()
// const devMiddleware = async(ctx, next) => {
//   await koaDevMiddleware(ctx.req, {
//     end: (content) => {
//       ctx.body = content
//     },
//     setHeader: ctx.set.bind(ctx)
//   }, next)
// }

// const hotMiddleware = async(ctx, next) => {
//   let stream = new PassThrough()
//   ctx.body = stream
//   await koaHotMiddleware(ctx.req, {
//     write: stream.write.bind(stream),
//     writeHead: (state, headers) => {
//       ctx.state = state
//       ctx.set(headers)
//     }
//   }, next)
// }

// app.use(devMiddleware)
// app.use(hotMiddleware)

// Object.keys(env.proxyTable).forEach(context => {
//   var options = env.proxyTable[context]
//   if (typeof options === 'string') {
//     options = {
//       target: options
//     }
//   }
//   const proxyMiddleware = httpProxyMiddleware(options.filter || context, options)
//   app.use(async(ctx, next) => proxyMiddleware(ctx.req, ctx.res, next))
// })
/* E - Koa */

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
