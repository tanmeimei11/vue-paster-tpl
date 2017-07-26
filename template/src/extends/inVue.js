import Vue from 'vue'
import { initPlugin } from 'plugins/initPlugin'
import { iTrack } from 'i-ui'
import { inpromo } from 'mixins/inPromo'
import * as config from 'config'
import injectFetch from 'mocks'
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
    initPlugin
  ]

  constructor (options) {
    options.track = config.track
    options.hideGlobalLoading = config.hideGlobalLoading
    options.share = config.shareMap(location)
    options.plugins = options.plugins || []
    InVue.basePlugins.concat(options.plugins).forEach(plugin => Vue.use(plugin))
    super(options)
  }

  static get mockPromise () {
    let promise = Promise.resolve()
    if (InVue.isMock) {
      promise = promise.then(() => config.mockMap())
        .then(map => { window.fetch = injectFetch(window.fetch, map) })
    }
    return promise
  }

  static batchMixin (mixins) {
    mixins.forEach((mixin) => {
      InVue.mixin(mixin)
    })
  }
}

InVue.mixin(inpromo)

export default InVue
