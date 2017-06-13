import toast from 'iUtil/toast'
import icommon from 'iUtil/common'
import { trackParam } from 'iUtil/track'
import awake from 'iUtil/jsBridge'
/**
 * 设置全局方法
 * @param {Vue} Vue
 */
export const initMethod = Vue => {
  let eventHub = new Vue()
  Object.defineProperties(Vue.prototype, {
    $eventHub: {
      get () {
        return eventHub
      }
    },
    $toast: {
      get () {
        return toast
      }
    },
    $track: {
      get () {
        return trackParam
      }
    },
    $awake: {
      get () {
        return awake
      }
    },
    $InApp: {
      get () {
        return icommon.isInApp
      }
    }
  })
}

export const SHARE_CONFIG = {
  shareTitle: 'shareTitle', // 分享标题
  shareDesc: 'shareDesc', // 分享描述
  shareLink: location.protocol + `//${location.host}/inpromo/2017/{{ name }}/index.html?_ig=share`,
  shareImg: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
  shareTrack: 'share'
}

export const TRACK_PREFIX = `h5_promo_pr-zhenhunjie_${(location.pathname.split('/').slice(-1)[0].replace(/.html$/, '') || 'index')}_`
