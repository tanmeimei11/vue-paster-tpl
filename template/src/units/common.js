import hintMessage from 'units/hintMessage'
import icommon from 'iUtil/common'
import iTrack from 'iDirectives/iTrack'
import share from 'iUtil/share'
import track from 'iUtil/track'
/**
 * 页面初始化 (设置分享、设置公共方法)
 * @param {Vue} Vue
 * @param {Object} opts
 */
export const initPage = (Vue, opts) => {
  icommon.initIn()
  /**
   * 设置分享信息
   */
  share.config = opts.share
  /**
   * 设置页面打开埋点
   */
  track('h5_promo_{{ name }}_index_enter')

  Vue.use(Vue => {
    /**
     * 设置埋点指令
     */
    Vue.directive('iTrack', iTrack)
    Object.defineProperties(Vue.prototype, {
      $toast: {
        get () {
          return hintMessage
        }
      },
      $track: {
        get () {
          return track
        }
      },
      $share: {
        get () {
          return Object.defineProperties({}.prototype, {
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

