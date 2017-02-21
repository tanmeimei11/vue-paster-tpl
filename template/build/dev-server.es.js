import {
  PassThrough
} from 'stream'
import Koa from 'koa'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import proxyMiddleware from 'http-proxy-middleware'
import cfg from './webpack.dev.config'
import {
  env
} from '../config'

const app = new Koa()
const compiler = webpack(cfg)
const port = process.env.PORT || env.port

const koaDevMiddleware = webpackDevMiddleware(compiler, {
  stats: {
    colors: true,
    chunks: false,
    children: false
  }
})
const devMiddleware = async(ctx, next) => {
  await koaDevMiddleware(ctx.req, {
    end: (content) => {
      ctx.body = content
    },
    setHeader: ctx.set.bind(ctx)
  }, next)
}

const koaHotMiddleware = webpackHotMiddleware(compiler)
const hotMiddleware = async(ctx, next) => {
  let stream = new PassThrough()
  ctx.body = stream
  await koaHotMiddleware(ctx.req, {
    write: stream.write.bind(stream),
    writeHead: (state, headers) => {
      ctx.state = state
      ctx.set(headers)
    }
  }, next)
}


app.use(devMiddleware)
app.use(hotMiddleware)

// proxy api requests
Object.keys(env.proxyTable).forEach(context => {
  var options = env.proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(async(ctx, next) => {
    proxyMiddleware(options.filter || context, options)(ctx.req, ctx.res, next)
  })
})

app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  koaDevMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + port + '\n')
  })
})
