// api map
export const apiMap = {
  getUser: '/promo/userapi/currentuser'
}

// 分享设置
export const shareMap = (location) => {
  return {
    shareTitle: 'shareTitle', // 分享标题
    shareDesc: 'shareDesc', // 分享描述
    shareLink: location.protocol + `//${location.host}/inpromo/2017/{{ name }}/index.html?_ig=share`,
    shareImg: location.protocol + '//inimg02.jiuyan.info/in/2017/02/27/307746C7-A0AC-4D21-4D92-B480A77ADFA2.jpg',
    shareTrack: 'share'
  }
}

// 设置页面打开埋点
export const track = 'enter'
// 设置埋点的公共前缀
export const trackPrefix = (location) => {
  return `h5_promo_{{ name }}_${(location.pathname.split('/').slice(-1)[0].replace(/.html$/, '') || 'index')}_`
}

// 使用mock  
export const mock = true 
// 修改代理设置，需重启 
export const proxyTable = {
  '/promo': {
    target: 'http://58.215.141.112',
    secure: false,
    changeOrigin: true,
    onProxyReq (proxyReq, req, res) {
      proxyReq.setHeader('host', 'www.in66.com')
        // add custom header to request
        // proxyReq.setHeader('cookie', '_aries=7ca3bf90aa13bda853b4cd256e0463ff;tg_auth=e507305b87de478592707f80982cd551');
        // or log the req
    }
  }
}

// 设置分享图的方法 如果本地方法
// shareImg : `{{ name }}/${require('../../assets/img/share.jpg')}`
// 修改分享的方法 mixin ,可以直接修改某个字段 this.$utils.share.???=???
// import { share } from 'iMixins/inPromo'
// 修改分享的方法  share.config.??? = ???
// import share  from 'iUtil/share' 
