require('babel-register')({
  'presets': [
    'es2015', 'stage-0'
  ],
  'plugins': ['transform-runtime']
})
require('shelljs/global')
require('./es/tiny.es.js')
