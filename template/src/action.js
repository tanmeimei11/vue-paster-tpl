// 构建请求参数
const buildParam = (build, ...params) => params.forEach(param => Object.keys(param).forEach(key => build(key, param[`${key}`])))

// 构建请求方法
const buildFetch = (urls) => {
  let urlObj = {}
  Object.keys(urls).forEach(urlKey => {
    urlObj[`${urlKey}`] = (param, type = 'get') => {
      let url = urls[`${urlKey}`]
      let headers = {
        credentials: 'include'
      }
      if (type === 'get') {
        let query = []
        buildParam((key, val) => {
          query.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        }, baseParam, param)
        url = `${url}?${query.join('&')}`
      } else {
        let data = new FormData()
        buildParam((key, val) => {
          data.append(key, val)
        }, baseParam, param)
        headers.method = 'POST'
        headers.body = data
      }
      if (urlObj[`${urlKey}`].loading) return { then: () => {}, catch: () => {} }
      urlObj[`${urlKey}`].loading = true
      return fetch(url, headers).then(res => {
        urlObj[`${urlKey}`].loading = false
        return res
      }, err => {
        urlObj[`${urlKey}`].loading = false
        throw err
      }).then(res => res.json()).catch(error)
    }
  })
  return urlObj
}

// 通用错误
const error = () => {

}

// 通用参数
const baseParam = {
  promo_name: ''
}

var host = ''

if (/^qa/.test(location.host)) {
  host = '//qa.in66.com'
} else if (process.env.NODE_ENV === 'production') {
  host = '//www.in66.com'
}

/**
 *  请求地址
 *  URL.xxx({}).then
 */
export const URL = buildFetch({
  xxx: `${host}/???`
})
