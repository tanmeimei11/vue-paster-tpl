'use strict'
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
// register handlebars helper
Handlebars.registerHelper('if_eq', function (a, b, opts) {
    return a === b ?
        opts.fn(this) :
        opts.inverse(this)
})
Handlebars.registerHelper('unless_eq', function (a, b, opts) {
    return a === b ?
        opts.inverse(this) :
        opts.fn(this)
})
const opts = require('../meta')
const name = 'tests'

opts.helpers && Object.keys(opts.helpers).map(function (key) {
    Handlebars.registerHelper(key, opts.helpers[key])
})
let metalsmith = Metalsmith(path.join(src, 'template'))
let data = Object.assign(metalsmith.metadata(), {
    destDirName: name,
    inPlace: dest === process.cwd(),
    noEscape: true
})

metalsmith
    .use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(renderTemplateFiles(opts.skipInterpolation))
    .clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(name)
    .build(function (err) {
        done(err, metalsmith.metadata())
        logMessage(opts.completeMessage, data)
    })