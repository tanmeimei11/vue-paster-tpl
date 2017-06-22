import Vue from 'vue'
import { initPlugin } from 'plugins/initPlugin' 
import { iTrack } from 'i-ui'
import * as config from 'config' 

window._trackPrefix = config.trackPrefix(location) 

Vue.batchMixin = (mixins) => {
  mixins.forEach((mixin) => {
    Vue.mixin(mixin)  
  })
}

const basePlugins = [
  // directives
  iTrack, 
  // 初始化插件 
  initPlugin
]

export default class InVue extends Vue {

  constructor (options) {
    options.track = config.track 
    options.share = config.shareMap(location) 
    options.plugins = options.plugins || []
    basePlugins.concat(options.plugins).forEach(plugin => Vue.use(plugin))
    super(options)
  }

  get isInVue () {
    return true 
  }
}
