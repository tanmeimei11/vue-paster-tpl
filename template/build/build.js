require('babel-register')({
  'presets': [
    'es2015', 'stage-2'
  ],
  'plugins': ['transform-runtime']
})
process.env.NODE_ENV = 'production'
require('shelljs/global')
require('./build.es.js')
