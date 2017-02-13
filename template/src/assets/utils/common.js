function __splitData (str, delimiter, decodeKey, decodeValue) {
  if (str.trim().length === 0) return {}
  let items = str.split(delimiter)
  let info = {}
  items.forEach(item => {
    const _item = item.trim()
    const _idx = _item.indexOf('=')
    if (_idx === -1) {
      info[decodeKey(_item)] = ''
    } else {
      info[decodeKey(_item.substr(0, _idx))] = decodeValue(_item.substr(_idx + 1))
    }
  })
  return info
}

function __getValue (...keys) {
  for (let idx = 0; idx <= keys.length; idx++) {
    let key = keys[idx]
    let val = this.query[key] || this.cookie[key]
    if (val && val.trim().length > 0) {
      return val
    }
  }
}

const UA = window.navigator.userAgent.toLowerCase()
const TRACK_URL = `//stats1.jiuyan.info/onepiece/router.html`

const common = {
  IOS: /iphone|ipod|ipad/gi.test(UA),
  WeChat: /MicroMessenger/gi.test(UA),
  WeiBo: /Weibo/gi.test(UA),
  weibo: /Weibo/gi.test(UA),
  weixin: /MicroMessenger/gi.test(UA),
  isAndroid: /android|adr/gi.test(UA),
  isIos: /iphone|ipod|ipad/gi.test(UA),
  // 查询请求
  query: __splitData(
    location.search.substr(1),
    '&',
    key => key.replace(/-+(.)?/g, (match, chr) => chr ? chr.toUpperCase() : ''),
    decodeURIComponent),
  // 查询cookie
  get cookie () {
    return __splitData(
      document.cookie,
      ';',
      key => key,
      unescape)
  },
  // 获取当前的curUrl
  get curUrl () {
    return encodeURIComponent(`${location.href.split('?')[0]}?shareauth=true`)
  },
  // 获取版本
  get version () {
    return __getValue.bind(this)('_v', '_version')
  },
  // 获取类型
  get source () {
    return __getValue.bind(this)('_s', '_source')
  },
  // 获取token
  get token () {
    return __getValue.bind(this)('_token', 'tg_auth')
  },
  // 设置cookie
  set cookie (val) {
    let {
      name,
      value,
      expiredays
    } = val
    var exdate = new Date()
    const domian = 'in66.com'
    exdate.setDate(exdate.getDate() + expiredays)
    const expireStr = expiredays == null ? '' : ';expires=' + exdate.toGMTString()
    document.cookie = `${name}=${escape(value)};domain=${domian};path=/;${expireStr}`
    return __splitData.bind(this)(document.cookie, ';', key => key, decodeURIComponent)
  },
  /**
   * 判断是否为app内
   */
  get InApp () {
    return !this.weixin && !this.weibo &&
      this.token != null && this.token.length > 0 &&
      /^(ios|android)$/i.test(this.source) &&
      /^[\d\\.]+$/.test(this.version)
  },
   /**
   * 判断版本
   */
  LessThanVer (_version) {
    let rgx = /(\d+)\.?(\d+)?\.?(\d+)?/
    let curVer = rgx.exec(`${this.version}`).slice(1)
    let tagVer = rgx.exec(`${_version}`).slice(1)
    if (!curVer) return true
    for (var i = 0; i < curVer; i++) {
      return Number(curVer[i]) < Number(tagVer[i])
    }
    return false
  },
  /**
   * 打开inapp 相应的页面
   */
  openInApp () {
    var appUrlObj = window.appUrlObj
    if (typeof appUrlObj === 'undefined') {
      return false
    }

    let appUrl = ''

    if (this.isIos) {
      appUrl = appUrlObj.iosMessage
    } else if (this.isAndroid) {
      appUrl = appUrlObj.androidMessage
    } else {
      return false
    }

    if (typeof appUrl === 'undefined') {
      return false
    }

    var applinks = /in:\/\//.test(appUrl) ? '//m.in66.com/applinks' : '//chat.in66.com/applinks'
    location.href = applinks + '?protocol=' + encodeURIComponent(appUrl)
  }
}

// 设置值
if (common.InApp) {
  var expiredays = 30
  var token = common.query['_token']
  var source = common.query['_s'] || common.cookie['_source']
  var version = common.query['_v'] || common.cookie['_version']
  token && (common.cookie = {
    name: 'tg_auth',
    value: token,
    expiredays: expiredays
  }) && (common.cookie = {
    name: '_token',
    value: token,
    expiredays: expiredays
  })
  source && (common.cookie = {
    name: '_s',
    value: source,
    expiredays: expiredays
  })
  version && (common.cookie = {
    name: '_v',
    value: version,
    expiredays: expiredays
  })
}

const IN_WXSDK = '//www.in66.com/promo/commonapi/getweixinjssdkconfig'
export const share = {
  initWXEnd: false,
  initData (config) {
    this._config = config
    if (this._config.shareTitle) {
      common.WeChat && this.wxConfig()
      common.InApp && this.inConfig()
    }
  },
  initWx () {
    var shareObj = {
      title: this._config.shareTitle,
      link: this._config.shareLink,
      imgUrl: this._config.shareImg,
      desc: this._config.shareDesc,
      success: () => {
        this._config.shareTrack && track(this._config.shareTrack)
        this._config.success && this._config.success()
      },
      cancel: () => {
        this._config.cancel && this._config.cancel()
      }
    }
    wx.error(function (res) { //eslint-disable-line
      // alert(JSON.stringify(res))
    })
    wx.ready(function () { //eslint-disable-line
      wx.onMenuShareTimeline(shareObj) //eslint-disable-line
      wx.onMenuShareAppMessage(shareObj) //eslint-disable-line
      wx.onMenuShareQQ(shareObj)//eslint-disable-line
      wx.onMenuShareWeibo(shareObj)//eslint-disable-line
      wx.onMenuShareQZone(shareObj)//eslint-disable-line
    })
  },
  wxConfig () {
    if (this.initWXEnd) return this.initWx()
    this.initWXEnd = true
    fetch(`${IN_WXSDK}?redirectUrl=${encodeURIComponent(location.href.split('#')[0])}`)
      .then(res => res.json())
      .then(res => {
        if (res.succ) {
          let data = res.data
          wx.config({//eslint-disable-line
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
              'onMenuShareAppMessage',
              'onMenuShareTimeline',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'
            ]
          })
          this.wxConfig()
        }
      })
  },
  inConfig () {
    let shareSet = document.getElementById('shareSet')
    if (shareSet == null) {
      shareSet = document.createElement('div')
      shareSet.setAttribute('id', 'shareSet')
      document.body.appendChild(shareSet)
    }
    var html = []
    for (let key in this._config) {
      let _key = key
      let val = this._config[key]
      if (_key === 'shareImg') {
        html.push(`<input type="hidden" id="shareImgSrc" value="${val}">`)
        html.push(`<input type="hidden" id="shareImgUrl" value="${val}">`)
      } else if (_key === 'shareTrack') {
        val = `${location.protocol}//${TRACK_URL}?` + [`action=${val}`, `_token=${common.token}`, `_=${+new Date()}`].join('&')
      }
      html.push(`<input type="hidden" id="${key}" value="${val}">`)
    }
    shareSet.innerHTML = html.join('')
  },
  get config () {
    return this._config
  },
  set config (config) {
    this.initData(config)
  }
}

export function track (seed, query = []) {
  let img = new Image()
  query.push(`action=${seed}`)
  img.src = `${location.protocol}${TRACK_URL}?` + query.concat([
    `_host=${location.host}`,
    `_token=${common.token}`,
    `_s=${common.source}`,
    `_v=${common.version}`,
    `_=${+new Date()}`
  ]).join('&')
}

export function hintMessage (msg, millisecond = 3000) {
  let hitEle = document.createElement('div')
  hitEle.setAttribute('class', 'hint-box')
  hitEle.innerText = msg
  document.body.appendChild(hitEle)
  setTimeout(function () {
    document.body.removeChild(hitEle)
  }, millisecond)
}

export default common
