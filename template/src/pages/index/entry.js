import Vue from 'vue'
import App from './App'
import iTrack from 'i-ui/src/directives/iTrack'
import share from 'i-ui/src/util/share'
import track from 'i-ui/src/util/track'
import common from 'i-ui/src/util/common'
import 'assets/scss/reset.scss'

common.initIn()

Vue.use(Vue => {
  Vue.directive('iTrack', iTrack)
})
share.config = {
  shareTitle: '', // 分享标题
  shareDesc: '', // 分享描述
  shareLink: location.protocol + `//h5.in66.com/inpromo/2017/{{ name }}/index.html?_ig=share`,
  shareImg: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
  shareTrack: 'h5_promo_{{ name }}_index_share'
}
track('h5_promo_{{ name }}_index_enter')

new Vue({
  el: '#app',
  render: h => h(App)
})
