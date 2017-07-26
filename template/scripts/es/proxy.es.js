import { watchFile } from 'fs'
import httpProxyMiddleware from 'http-proxy-middleware'
import contextMatcher from 'http-proxy-middleware/lib/context-matcher'
import logger from 'http-proxy-middleware/lib/logger'
import {
  blue
} from 'chalk'
import {
  env
} from '../../config'
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
logger.getInstance().setLevel('warn')
showProxyInfo()
watchFile(configJs, () => {
  delete require.cache[require.resolve(configJs)]
  proxyTable = require(configJs).proxyTable
  showProxyInfo('modify')
})
export default (req, res, next) => {
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
}
