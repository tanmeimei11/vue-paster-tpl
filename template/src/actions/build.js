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
