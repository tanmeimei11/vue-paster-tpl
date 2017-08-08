import { watchFile } from 'fs'
import httpProxyMiddleware from 'http-proxy-middleware'
import contextMatcher from 'http-proxy-middleware/lib/context-matcher'
import logger from 'http-proxy-middleware/lib/logger'
import {
  blue,
  green
} from 'chalk'
import {
  env
} from '../../config'
/** proxy  */
let configJs = env.assetsPath('src/config.js')
let proxyTable = require(configJs).proxyTable
let mockMap = require(configJs).mockMap
const parseUrl = context => {
  let ctxSplit = context.split(':')
  return `${(ctxSplit.length === 1 ? `GET:` : ``)}${context}`.split(':')
}
let showProxyInfo = (stats = 'init') => {
  Object.keys(mockMap).forEach(function (context) {
    let [method, url] = parseUrl(context)
    console.log(`${blue(`[HPM] Proxy ${stats}`)} : ${green(method)} ${url} ->  ${mockMap[context]}`)
  })
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    console.log(`${blue(`[HPM] Proxy ${stats}`)} : ${context}  ->  ${typeof options === 'string' ? options : options.target}`)
  })
}
logger.getInstance().setLevel('warn')
showProxyInfo()
watchFile(configJs, () => {
  delete require.cache[require.resolve(configJs)]
  try {
    let cfg = require(configJs)
    proxyTable = cfg.proxyTable
    mockMap = cfg.mock ? cfg.mockMap : {}
    showProxyInfo('modify')
  } catch (err) {}
})
export default (req, res, next) => {
  let shouldProxy = false
  let path = (req.originalUrl || req.url)
  Object.keys(mockMap).forEach(function (context) {
    let [method, url] = parseUrl(context)
    if (!shouldProxy) {
      shouldProxy = contextMatcher.match(url, path, req) && req.method === method
      if (shouldProxy) {
        res.sendFile(env.assetsPath('src', mockMap[context]))
      }
    }
  })
  Object.keys(proxyTable).forEach(function (context) {
    if (!shouldProxy) {
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
}
