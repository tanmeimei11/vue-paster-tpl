import awake from 'iUtil/jsBridge'
import icommon from 'iUtil/common'
/**
 * 打开in记
 */
export const diary = {
  methods: {
    diaryOpen (author, refresh = false) {
      if (icommon.InApp) {
        if (refresh) {
          awake(`in://diary/other?userid=${author}&refresh=1`)
        } else {
          awake(`in://diary/other?userid=${author}`)
        }
      } else {
        location.href = `${location.protocol}//www.in66.com/user?uid=${author}`
      }
    }
  }
}
/**
 * 打开话题
 */
export const tag = {
  methods: {
    tagOpen (tagid, refresh = false) {
      if (icommon.InApp) {
        if (refresh) {
          awake(`in://tag?tagid=${tagid}&refresh=1`)
        } else {
          awake(`in://tag?tagid=${tagid}`)
        }
      } else {
        location.href = `${location.protocol}//www.in66.com/tag/index?tgid=${tagid}`
      }
    }
  }
}
/**
 * 打开照片详情页面
 */
export const photo = {
  methods: {
    photoOpen (photoId, refresh = false) {
      if (icommon.InApp) {
        if (refresh) {
          awake(`in://photodetail?pid=${photoId}&refresh=1`)
        } else {
          awake(`in://photodetail?pid=${photoId}`)
        }
      } else {
        location.href = `${location.protocol}//www.in66.com/p/${photoId}`
      }
    }
  }
}
