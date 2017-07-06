/**
 * 初始化插件 
 * @param {Vue} Vue
 */
import toast from 'iUtil/toast'
import common from 'iUtil/common'
import share from 'iUtil/share'
import awake from 'iUtil/jsBridge' 
import { trackParam } from 'iUtil/track'

export const initPlugin = Vue => {
  let eventHub = new Vue()
  Object.defineProperties(Vue.prototype, {
    $hide: {
      get () {
        document.getElementById('global-loading').style.display = 'none'
        return true
      }
    },
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
    $share: {
      get () {
        return share 
      }
    },
    $common: {
      get () {
        return common
      }
    }
  })
}

