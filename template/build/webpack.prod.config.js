import Config from 'webpack-config'

export default new Config().extend({
  'build/webpack.base.config.js': config => {
    return config
  }
}).merge({
})
