/**
 * 基础的url配置
 */
// export const U_IN = '//love.in66.com'
// export const U_IN_QA = '//qainlove.in66.com'
// export const U_IN = '//promo.in66.com'
// export const U_IN_QA = '//qapromo.in66.com'
// export const U_IN = '//pabei.in66.com'
// export const U_IN_QA = '//qapabei.in66.com'
export const U_IN = '//www.in66.com'
export const U_IN_QA = '//qa.in66.com'
export const C_IN = `${/^qa/.test(location.host) ? U_IN_QA : process.env.NODE_ENV === 'production' ? U_IN : ''}`
/**
 * U_IN_APPLINKS in的applinks
 * U_CHAT_APPLINKS chat的applinks
 * U_TRACK 埋点
 * U_IN_WXSDK in的wxsdk
 * QNTokenUrl 七牛token
 */
export const U_IN_APPLINKS = '//m.in66.com/applinks'
export const U_CHAT_APPLINKS = '//chat.in66.com/applinks'
export const U_TRACK = '//stats1.jiuyan.info/onepiece/router.html'
export const U_IN_WXSDK = '//www.in66.com/promo/commonapi/getweixinjssdkconfig'
export const QNTokenUrl = `${C_IN}/promo/commonapi/qiniutoken`
/**
 * ------------------------------------------------------------------
 * 全局loading
 * 0:挂载时隐藏(window.contentLoaded)
 * 1:手动隐藏(manual) 使用this.$hide()
 * ------------------------------------------------------------------
 */
export const hideGlobalLoading = 0
/**
 * ------------------------------------------------------------------
 * 分享设置
 * 设置分享图的方法 如果本地方法
 * shareImg : `{{name}}/${require('./assets/img/share.jpg')}`
 *
 * vue内部修改分享设置
 * this.$share.config.xxx = ????
 * 
 * vue外部分享设置 
 * import share  from 'iUtils/share'
 * 修改分享的方法  share.config.??? = ???
 *
 * ------------------------------------------------------------------
 */
export const shareMap = {
  title: 'shareTitle', // 分享标题
  desc: 'shareDesc', // 分享描述
  link: location.protocol + `//${location.host}/inpromo/2017/{{name}}/index.html?_ig=share`,
  img: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
  track: 'share'
}
/**
 * ------------------------------------------------------------------
 * 埋点设置
 * _trackPrefix: 设置埋点的公共前缀
 * track:设置页面打开埋点
 * ------------------------------------------------------------------
 */
window._trackPrefix = `h5_promo_{{name}}_${(location.pathname.split('/').slice(-1)[0].replace(/.html$/, '') || 'index')}_`
export const track = 'enter'
/**
 * ------------------------------------------------------------------
 * apiCommonParam:api请求的公共参数
 * apiMap:api名和api地址映射
 * 
 * apiMap 的值可以是对象或者字符串 
 * 1. 字符串的时候就是请求地址 xxxx
 * 2. 对象的时候 例如:{ url:'xxx',type:'xhr',method:'post' } 
 *    默认值为 { url:'xxx',type:'fetch',method:'get' }
 * 使用的时候 api.xxx({},{method:'post',type:'xhr'}) 优先级最高
 * ------------------------------------------------------------------
 */
export const apiCommonParam = {
  promo_name: '{{name}}'
}
export const apiMap = {
  getUser: '/promo/userapi/currentuser',
  getUserPost: {
    url: '/promo/userapi/currentuser',
    method: 'post',
    type: 'xhr'
  }
}

/**
 * 设置页面路由
 */
export const routers = {
  main: 'index',
  pages: ['share']
}
