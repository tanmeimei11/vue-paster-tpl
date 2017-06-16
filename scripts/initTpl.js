'use strict'
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const async = require('async')
const match = require('minimatch')
const inquirer = require('inquirer')
const path = require('path')
const opts = require('../meta')
const ask = require('./lib/ask')
const filter = require('./lib/filter')
const render = require('./lib/render')
const exec = require('./lib/exec')

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


let metalsmith = Metalsmith(path.join(process.cwd(), './template'))
let data = Object.assign(metalsmith.metadata(), {
    desc: name,
    inPlace: false,
    noEscape: true
})
metalsmith
    .use(askQuestions(opts.prompts))
    .use(filterFiles(opts.filters))
    .use(render(opts.skipInterpolation))
    .clean(false)
    .source('.') // start from template root instead of `./src` which is Metalsmith's default for `source`
    .destination(name)
    .build(function (err) {
        console.log('done')
    })