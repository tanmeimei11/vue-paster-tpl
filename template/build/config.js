var path = require('path')

module.exports = {
  /**
   * 约定:
   * 页面入口  /index.html
   * 入口脚本  /entry.js
   * - 输出目录必须为 dist, 不可更改
   */
  rule: {
    template: 'index.html',
    script: 'entry.js',
    input: path.resolve(__dirname, '../src/pages/'),
    output: path.resolve(__dirname, '../dist')
  },
  build: {
    env: '"production"'
  },
  dev: {
    env: '"development"',
    port: 8080,
    path: '/',
    proxy: {
      '/promo': {
        target: 'https://www.in66.com',
        secure: false
      }
    }
  }
}
