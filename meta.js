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
    "src/store/*.js": "vuex === 'yes'",
    "src/pages/index/**/*.*": "vuex === 'yes'",
    "src/pages/example/**/*.*": "vuex === 'no'"
  },
  "skipInterpolation": "src/**/*.vue",
  'completeMessage':'cd {{destDirName}}\n 如果不是活动要去掉 import \'assets/libs/growingio.js\''
}