import toast from 'iUtil/toast'
import icommon from 'iUtil/common'
import { iTrack } from 'i-ui'
import share from 'iUtil/share'
import { trackParam } from 'iUtil/track'
import awake from 'iUtil/jsBridge'
/**
 * 页面初始化 (设置分享、设置公共方法)
 * @param {Vue} Vue
 * @param {Object} opts
 */
export const initPage = (Vue, opts) => {
  icommon.initIn()
  opts = {
    trackBase: `h5_promo_{{ name }}_${(location.pathname.split('/').slice(-1)[0].replace(/.html$/, '') || 'index')}`,
    ...opts
  }
  /**
   * 设置分享信息
   */
  if (opts.share) {
    share.config = opts.share
  }
  /**
   * 设置页面打开埋点
   */
  trackParam(opts.track || `${opts.trackBase}_enter`)
  /**
    * 设置埋点指令
  */
  Vue.use(iTrack)
  Vue.use(Vue => {
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
      },
      $share: {
        set (val) {
          share.config = val
        },
        get () {
          return Object.defineProperties({}, {
            shareTitle: {
              set (value) {
                let _config = share.config
                _config.shareTitle = value
                share.config = _config
              },
              get () { return share.config.shareTitle }
            },
            shareDesc: {
              set (value) {
                let _config = share.config
                _config.shareDesc = value
                share.config = _config
              },
              get () { return share.config.shareDesc }
            },
            shareLink: {
              set (value) {
                let _config = share.config
                _config.shareLink = value
                share.config = _config
              },
              get () { return share.config.shareLink }
            },
            shareImg: {
              set (value) {
                let _config = share.config
                _config.shareImg = value
                share.config = _config
              },
              get () { return share.config.shareImg }
            },
            shareTrack: {
              set (value) {
                let _config = share.config
                _config.shareTrack = value
                share.config = _config
              },
              get () { return share.config.shareTrack }
            }
          })
        }
      }
    })
  })
}
