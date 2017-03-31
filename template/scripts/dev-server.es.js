import config from '../imock-config'
import imock from 'imock-tool'

const port = config.port
const koaDevMiddleware = config.middlewares[0]

const app = imock(config, function(err) {
  koaDevMiddleware.waitUntilValid(function() {
    console.log(`> Listening at http://localhost:${port}\n`)
  })
})
