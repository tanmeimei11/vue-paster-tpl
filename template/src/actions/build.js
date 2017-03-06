/**
 * 遍历请求参数
 * @param {function} forEach 回调方法
 * @param {Object} params 请求对象
 */
export const forEachParam = (forEach, ...params) => params.forEach(param => Object.keys(param).forEach(key => forEach(key, param[`${key}`])))

/**
 * 构建get请求参数
 * @param {*} url 地址
 * @param {*} params 请求对象
 */
export const buildGetParam = (url, ...params) => {
  let query = []
  forEachParam((key, val) => {
    query.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
  }, ...params)
  return `${url}?${query.join('&')}`
}

/**
 * 构建post请求参数
 * @param {*} params 请求对象
 */
export const buildPostParam = (...params) => {
  let data = new FormData()
  forEachParam((key, val) => {
    data.append(key, val)
  }, ...params)
  return data
}

/**
 * 构建请求方法（每个请求每次只能执行一次）
 * @param {Object} baseParam
 * @param {String} urls 请求地址
 * @param {function} error
 */
export const buildFetch = (baseParam, urls, error = (err) => {
  throw err
}) => {
  let urlObj = {}
  Object.keys(urls).forEach(urlKey => {
    urlObj[`${urlKey}`] = (param, type = 'get') => {
      let url = urls[`${urlKey}`]
      let options = {
        credentials: 'include'
      }
      if (type === 'get') {
        url = buildGetParam(url, baseParam, param)
      } else {
        options.method = 'POST'
        options.body = buildPostParam(baseParam, param)
      }
      if (urlObj[`${urlKey}`].loading) {
        return {
          then: () => {},
          catch: () => {}
        }
      }
      urlObj[`${urlKey}`].loading = true
      return fetch(url, options).then(res => {
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
