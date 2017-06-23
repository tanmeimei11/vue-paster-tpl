import Vue from 'vue'
import { initPlugin } from 'plugins/initPlugin' 
import { iTrack } from 'i-ui'
import { inpromo } from 'mixins/inPromo'
import * as config from 'config' 

window._trackPrefix = config.trackPrefix(location) 

const basePlugins = [
  // directives
  iTrack, 
  // 初始化插件 
  initPlugin
]

class InVue extends Vue {
  constructor (options) {
    options.track = config.track 
    options.hideGlobalLoading = config.hideGlobalLoading 
    options.share = config.shareMap(location) 
    options.plugins = options.plugins || []
    basePlugins.concat(options.plugins).forEach(plugin => Vue.use(plugin))
    super(options)
  }

  get isInVue () {
    return true 
  }
}

InVue.batchMixin = (mixins) => {
  mixins.forEach((mixin) => {
    InVue.mixin(mixin)  
  })
}

InVue.mixin(inpromo)

export default InVue
