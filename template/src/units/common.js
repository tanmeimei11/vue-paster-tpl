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
        return icommon.InApp
      }
    }
  })
}
