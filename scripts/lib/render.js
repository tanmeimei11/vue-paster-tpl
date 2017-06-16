const render = require('consolidate').handlebars.render
const async = require('async')
var match = require('minimatch')
module.exports = function (skipInterpolation) {
    return function (files, metalsmith, done) {
        var keys = Object.keys(files)
        var metalsmithMetadata = metalsmith.metadata()
        async.each(keys, function (file, next) {
            // skipping files with skipInterpolation option
            if (skipInterpolation && match(file, skipInterpolation, {
                    dot: true
                })) {
                return next()
            }
            var str = files[file].contents.toString()
            // do not attempt to render files that do not have mustaches
            if (!/{{([^{}]+)}}/g.test(str)) {
                return next()
            }
            render(str, metalsmithMetadata, function (err, res) {
                if (err) return next(err)
                files[file].contents = new Buffer(res)
                next()
            })
        }, done)
    }
}