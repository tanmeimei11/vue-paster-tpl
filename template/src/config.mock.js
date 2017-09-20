/**
 * ------------------------------------------------------------------
 * mock设置
 * mock:开启mock 只是mock文件的开关
 * mockMap:mock时读取的文件映射 （包含同样的地址 url 前面可以添加 GET: 或者 POST: 区分）
 * proxyTable:代理设置
 * ------------------------------------------------------------------
 */
export const mock = true
export const mockMap = {
  '/promo/userapi/currentuser': 'mocks/json/user.json',
  'POST:/promo/userapi/currentuser': 'mocks/json/post.json'
}
export const proxyTable = {
  '/promo': {
    target: 'http://58.215.141.112',
    secure: false,
    changeOrigin: true,
    onProxyReq (proxyReq, req, res) {
      // webtest token
      proxyReq.setHeader('host', 'www.in66.com')
      proxyReq.setHeader('cookie', '_aries=414a78d7341953c137b69b445fbd8e5b;tg_auth=be3b20507b8fed99645640c9a053dee6')
    }
  }
}
