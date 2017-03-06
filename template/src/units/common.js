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
  share.config = {
    shareTitle: 'shareTitle', // 分享标题
    shareDesc: 'shareDesc', // 分享描述
    shareLink: location.protocol + `//h5.in66.com/inpromo/2017/{{ name }}/index.html?_ig=share`,
    shareImg: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
    shareTrack: 'h5_promo_{{ name }}_index_share'
  }
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
        set (config) {
          share.config = {
            shareTitle: config.shareTitle || share.config.shareTitle,
            shareDesc: config.shareDesc || share.config.shareDesc,
            shareLink: config.shareLink || share.config.shareLink,
            shareImg: config.shareImg || share.config.shareImg,
            shareTrack: config.shareTrack || share.config.shareTrack
          }
        },
        get () {
          return share.config
        }
      }
    })
  })
}

