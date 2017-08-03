/**
 * 基础的url配置
 */
// export const U_IN = '//love.in66.com'
// export const U_IN_QA = '//qainlove.in66.com'
export const U_IN = '//promo.in66.com'
export const U_IN_QA = '//qapromo.in66.com'
export const U_IN_APPLINKS = '//m.in66.com/applinks'
export const U_CHAT_APPLINKS = '//chat.in66.com/applinks'
export const U_TRACK = '//stats1.jiuyan.info/onepiece/router.html'
export const U_IN_WXSDK = '//www.in66.com/promo/commonapi/getweixinjssdkconfig'
/**
 * ------------------------------------------------------------------
 * 全局loading
 * 0:挂载时隐藏(window.contentLoaded)
 * 1:手动隐藏(manual) 使用this.$hide
 * ------------------------------------------------------------------
 */
export const hideGlobalLoading = 0

/**
 * ------------------------------------------------------------------
 * 分享设置
 * 设置分享图的方法 如果本地方法
 * shareImg : `{{ name }}/${require('./assets/img/share.jpg')}`
 *
 * vue内部修改分享设置
 * this.$share.config.xxx = ????
 *
 * vue外部分享设置 方法1:
 * import { share } from 'iMixins/inPromo'
 * 修改分享的方法 mixin ,可以直接修改某个字段 this.$utils.share.???=???
 *
 * vue外部分享设置 方法2:
 * import share  from 'iUtils/share'
 * 修改分享的方法  share.config.??? = ???
 *
 * ------------------------------------------------------------------
 */
export const shareMap = (location) => {
  return {
    shareTitle: 'shareTitle', // 分享标题
    shareDesc: 'shareDesc', // 分享描述
    shareLink: location.protocol + `//${location.host}/inpromo/2017/{{ name }}/index.html?_ig=share`,
    shareImg: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
    shareTrack: 'share'
  }
}

/**
 * ------------------------------------------------------------------
 * 埋点设置
 * track:设置页面打开埋点
 * trackPrefix: 设置埋点的公共前缀
 * ------------------------------------------------------------------
 */
export const track = 'enter'
export const trackPrefix = (location) => {
  return `h5_promo_{{ name }}_${(location.pathname.split('/').slice(-1)[0].replace(/.html$/, '') || 'index')}_`
}

/**
 * ------------------------------------------------------------------
 * apiCommonParam:api请求的公共参数
 * apiMap:api名和api地址映射
 * ------------------------------------------------------------------
 */
export const apiCommonParam = {
  promo_name: '{{name}}'
}
export const apiMap = {
  getUser: '/promo/userapi/currentuser'
}
/**
 * ------------------------------------------------------------------
 * mock设置
 * mock:开启mock 只是mock文件的开关
 * mockMap:mock时读取的文件映射
 * proxyTable:代理设置
 * ------------------------------------------------------------------
 */
export const mock = true
export const mockMap = process.env.NODE_ENV === 'production' ? {} : {
  '/promo/userapi/currentuser': 'mocks/json/user.json'
}
export const proxyTable = process.env.NODE_ENV === 'production' ? {} : {
  '/promo': {
    target: 'http://58.215.141.112',
    secure: false,
    changeOrigin: true,
    onProxyReq (proxyReq, req, res) {
      // webtest token
      proxyReq.setHeader('host', 'promo.in66.com')
      proxyReq.setHeader('cookie', '_aries=414a78d7341953c137b69b445fbd8e5b;tg_auth=be3b20507b8fed99645640c9a053dee6')
    }
  }
}
