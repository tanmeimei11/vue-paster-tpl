import 'core-js/fn/promise'
import 'whatwg-fetch'
import { iTrack } from 'i-ui'
import InVue from 'iExtends/InVue.js'
import 'iScss/base.scss'
import App from './App.vue'
// 灰灰的sdk
import 'assets/libs/web-analytics'
// 微信分享的sdk
import 'assets/libs/jweixin-1.0.0.js' 
{{#if_eq growingIO "yes"}}
// 活动必须的growingio埋点
import 'assets/libs/growingio.js'
{{/if_eq}}
// 设置全局vue方法,也可以不用
import { initMethod, SHARE_CONFIG, TRACK_PREFIX } from 'units/common' 
{{#if_eq vuex "yes"}}
import store from 'stores'
{{/if_eq}}
import 'mocks'

// 设置埋点的公共前缀
window._trackPrefix = TRACK_PREFIX

new InVue({
  {{#if_eq vuex "yes"}}
  store,
  {{/if_eq}}
  plugins: [iTrack, initMethod], // 类似vue.use
  track: 'enter', // 设置页面打开埋点
  share: {
    shareTitle: SHARE_CONFIG.shareTitle, // 分享标题
    shareDesc: SHARE_CONFIG.shareDesc, // 分享描述
    shareLink: SHARE_CONFIG.shareLink,
    shareImg: SHARE_CONFIG.shareImg,
    shareTrack: SHARE_CONFIG.shareTrack
  },
  api: {
    getUser: '/promo/userapi/currentuser'
  },
  render: h => h(App)
}).$mount('#app')

// 设置分享图的方法 如果本地方法
// shareImg : `{{ name }}/${require('../../assets/img/share.jpg')}`
// 修改分享的方法 mixin ,可以直接修改某个字段 this.$utils.share.???=???
// import { share } from 'iMixins/inPromo'
// 修改分享的方法  share.config.??? = ???
// import share  from 'iUtil/share' 
