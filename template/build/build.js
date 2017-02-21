require('babel-register')({
  'presets': [
    'es2015', 'stage-2'
  ]
})
require('shelljs/global')
require('./build.es.js')
