require('babel-register')({
  'presets': [
    'es2015', 'stage-2'
  ]
})
process.env.NODE_ENV = 'production'
require('shelljs/global')
require('./build.es.js')
