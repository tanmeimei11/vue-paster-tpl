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
    }
  },
  "skipInterpolation": "src/**/*.vue",
  complete(data, {
    logger,
    chalk
  }) {
    if (!data.inPlace) {
      logger.log(`cd ${chalk.yellow(data.destDirName)}`)
    }
  }
}