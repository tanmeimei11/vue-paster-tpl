import {
  polyfill
} from 'es6-promise'
import Vue from 'vue'
import App from './App.vue'
import {
  initPage
} from 'units/common'
import 'whatwg-fetch'
import {
  iAvatar
} from 'i-ui'
import store from 'store'
polyfill()

Vue.use(iAvatar)
initPage(Vue, {
  share: {
    shareTitle: 'shareTitle', // 分享标题
    shareDesc: 'shareDesc', // 分享描述
    shareLink: location.protocol + `//h5.in66.com/inpromo/2017/{{ name }}/index.html?_ig=share`,
    shareImg: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
    shareTrack: 'h5_promo_{{ name }}_index_share'
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
