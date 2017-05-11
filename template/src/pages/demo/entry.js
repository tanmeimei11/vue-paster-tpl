import 'core-js/fn/promise'
import 'whatwg-fetch'
import Vue from 'vue'
import App from './App.vue'
import {
  initPage
} from 'units/common'
import 'assets/libs/jweixin-1.0.0.js'
// import 'mocks'

initPage(Vue, {
  share: {
    shareTitle: 'shareTitle', // 分享标题
    shareDesc: 'shareDesc', // 分享描述
    shareLink: location.protocol + `//${location.host}/inpromo/2017/{{ name }}/index.html?_ig=share`,
    shareImg: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
    shareTrack: 'h5_promo_{{ name }}_index_share'
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
