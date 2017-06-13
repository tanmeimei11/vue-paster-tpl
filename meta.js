module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "项目名称"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "项目描述",
      "default": "A vue-parster-tpl project"
    },
    "author": {
      "type": "string",
      "message": "作者"
    },
    "vuex": {
      "type": "list",
      "message": "状态管理机(vuex)",
      "choices": [
        "yes",
        "no"
      ]
    }, 
    "growingIO": {
      "type": "list",
      "message": "GrowingIO(埋点)",
      "choices": [
        "yes",
        "no"
      ]
    }
  },
  "filters": {
    "src/stores/*.js": "vuex === 'yes'"
  },
  "metalsmith": function (metalsmith, opts, helpers) {
    function customMetalsmithPlugin (files, metalsmith, done) {
      console.log(files)
      done(null, files)
    }
    metalsmith.use(customMetalsmithPlugin)
  },
  "skipInterpolation": "src/**/*.vue",
  'completeMessage':'cd {{destDirName}}\n'
}