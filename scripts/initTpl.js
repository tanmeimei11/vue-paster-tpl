'use strict'
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const async = require('async')
const render = require('consolidate').handlebars.render
const match = require('minimatch')
const inquirer = require('inquirer')
const path = require('path')
const opts = require('../meta')
const ask = require('./lib/ask')
const filter = require('./lib/filter')
const name = path.join(process.cwd(), 'tests')
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

opts.helpers && Object.keys(opts.helpers).map(function (key) {
    Handlebars.registerHelper(key, opts.helpers[key])
})
let metalsmith = Metalsmith(path.join(process.cwd(), './template'))
let data = Object.assign(metalsmith.metadata(), {
    desc: name,
    inPlace: false,
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
        console.log(err)
    })



/**
 * Create a middleware for asking questions.
 *
 * @param {Object} prompts
 * @return {Function}
 */

function askQuestions(prompts) {
    return function (files, metalsmith, done) {
        ask(prompts, metalsmith.metadata(), done)
    }
}

/**
 * Create a middleware for filtering files.
 *
 * @param {Object} filters
 * @return {Function}
 */

function filterFiles(filters) {
    return function (files, metalsmith, done) {
        filter(files, filters, metalsmith.metadata(), done)
    }
}

function renderTemplateFiles(skipInterpolation) {
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