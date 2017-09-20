let file = process.argv[2]
if (file === 'build') {
  process.env.NODE_ENV = 'production'
}
require('babel-register')({
  'presets': [
    ['env', {
      'targets': {
        'node': 'current'
      }
    }], 'stage-0'
  ],
  'plugins': ['transform-runtime']
}) 
require('shelljs/global')
require(`./es/${file}.es.js`)
