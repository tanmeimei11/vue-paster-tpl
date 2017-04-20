require('babel-register')({
  'presets': [
    'es2015', 'stage-0'
  ],
  'plugins': ['transform-runtime']
})
process.env.NODE_ENV = 'production'
require('shelljs/global')
require('./es/build.es.js')
