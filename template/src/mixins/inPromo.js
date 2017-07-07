import {
  default as toastCall
} from 'iUtil/toast'
import {
  default as awakeCall
} from 'iUtil/jsBridge'

import iShare from 'iUtil/share'
import icommon from 'iUtil/common'
import {
  trackParam
} from 'iUtil/track'

/**
 * 提示
 */
export const toast = {
  created () {
    this.$toast = toastCall
  }
}

/**
 * 唤醒协议
 */
export const awake = {
  created () {
    this.$awake = awakeCall
  }
}

/**
 * 埋点
 */
export const track = {
  created () { 
    this.$track = trackParam 
  }
}

/**
 * common 内置 
 */
export const common = {
  created () {
    this.$common = icommon
  }
}

/**
 * 配置分享
 */
export const share = {
  created () {
    this.$share = iShare 
  }
}

export const inpromo = {
  created () {
    if (this.$common) {
      this.$common.initIn()
    }

    if (this.$track) {
      this.$track(this.$root.$options.track)
    }

    if (this.$share) {
      this.$share.config = this.$root.$options.share
    }
  }
}
export default [toast, awake, track, common, share] 
