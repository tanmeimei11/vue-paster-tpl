import Vue from 'vue'
{{#if_eq analytics "yes"}}
// 网页监控sdk
import 'analytics'
{{/if_eq}}
{{#if_eq growingIO "yes"}}
// 活动必须的growingio埋点
import 'assets/libs/growingio.js'
{{/if_eq}}
// 活动必须的growingio埋点
import { iTrack } from 'i-ui'
import injectObj from 'iPlugins/injectObj'
import inpromo from 'iMixins/inPromo'
import * as config from 'config'
import 'assets/libs/content-loaded'

window._trackPrefix = config.trackPrefix(location)

Vue.$hideGlobalLoading = () => {
  document.getElementById('global-loading').style.display = 'none'
}
if (config.hideGlobalLoading === 0) {
  window.contentLoaded(() => {
    Vue.$hideGlobalLoading()
  })
}

class InVue extends Vue {
  static isMock = process.env.NODE_ENV !== 'production' && config.mock  
  static basePlugins = [
    // directives
    iTrack, 
    // 初始化插件 
    injectObj,
    // 隐藏loading
    (config.hideGlobalLoading === 0 ? () => {} : (Vue) => {
      Object.defineProperties(Vue.prototype, {
        $hide: {
          get () {
            return Vue.$hideGlobalLoading
          }
        }
      })
    })
  ]

  constructor (options) {
    options.track = config.track 
    options.hideGlobalLoading = config.hideGlobalLoading 
    options.share = config.shareMap(location) 
    options.plugins = options.plugins || []
    InVue.basePlugins.concat(options.plugins).forEach(plugin => Vue.use(plugin))
    super(options)
  }

  static batchMixin (mixins) {
    mixins.forEach((mixin) => {
      InVue.mixin(mixin)  
    })
  }
}

InVue.mixin(inpromo)

export default InVue
