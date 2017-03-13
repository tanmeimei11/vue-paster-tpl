require('babel-register')({
  'presets': [
    'es2015', 'stage-2'
  ],
  'plugins': ['transform-runtime']
})
require('shelljs/global')
require('./dev-server.es.js')
