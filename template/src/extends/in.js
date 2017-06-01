import 'core-js/fn/promise'
import 'whatwg-fetch'
import Vue from 'vue'
import 'assets/libs/jweixin-1.0.0.js'
import {
  initPage
} from 'units/common'

let InVue = Vue.extend({
  // mixins: [mixin]
  created () {}
})

initPage(InVue, {
  share: {
    shareTitle: 'shareTitle', // 分享标题
    shareDesc: 'shareDesc', // 分享描述
    shareLink: location.protocol + `//${location.host}/inpromo/2017/{{ name }}/index.html?_ig=share`,
    shareImg: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
    shareTrack: 'share'
  }
})

export default InVue 
 
