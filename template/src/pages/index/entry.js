import 'core-js/fn/promise'
import 'whatwg-fetch'
import { iTrack } from 'i-ui'
import InVue from 'iExtends/InVue.js'
import 'iScss/base.scss'
import App from './App.vue'
import 'assets/libs/jweixin-1.0.0.js' // 微信分享的sdk
import 'assets/libs/growingio.js' // 活动必须的growingio埋点,其他的不用
import { initMethod } from 'units/common' // 设置全局vue方法,也可以不用
import store from 'stores'
// import 'mocks'

// 设置埋点的公共前缀
window._trackPrefix = `h5_promo_{{ name }}_${(location.pathname.split('/').slice(-1)[0].replace(/.html$/, '') || 'index')}_`

new InVue({
  store,
  plugins: [iTrack, initMethod], // 类似vue.use
  track: 'enter', // 设置页面打开埋点
  share: {
    shareTitle: 'shareTitle', // 分享标题
    shareDesc: 'shareDesc', // 分享描述
    shareLink: location.protocol + `//${location.host}/inpromo/2017/{{ name }}/index.html?_ig=share`,
    shareImg: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
    shareTrack: 'share'
  },
  render: h => h(App)
}).$mount('#app')

// 设置分享图的方法 如果本地方法
// shareImg : `{{ name }}/${require('../../assets/img/share.jpg')}`
// 修改分享的方法 mixin ,可以直接修改某个字段 this.$utils.share.???=???
// import { share } from 'iMixins/inProtocol'
// 修改分享的方法  share.config.??? = ???
// import share  from 'iUtil/share' 
