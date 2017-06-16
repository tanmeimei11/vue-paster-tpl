var match = require('minimatch')

module.exports = function (files, filters, data, done) {
  if (!filters) {
    return done()
  }
  var fileNames = Object.keys(files)
  Object.keys(filters).forEach(function (glob) {
    fileNames.forEach(function (file) {
      if (match(file, glob, { dot: true })) {
        var condition = filters[glob]
        if (!new Function('data', 'with (data) { return ' + condition + '}')(data)) {
          delete files[file]
        }
      }
    })
  })
  done()
}