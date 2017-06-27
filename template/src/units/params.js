/**
 * 是否为数组
 * @param {Object} val 
 */
const isObj = val => Object.prototype.toString.call(val) === '[object Object]'
/**
 * 是否为数组
 * @param {Object} val 
 */
const isArray = val => Object.prototype.toString.call(val) === '[object Array]'

/**
 * 遍历请求参数
 * @param {function} forEach 回调方法
 * @param {Object} params 请求对象
 */
export const forEachParam = (forEach, ...params) => params.forEach(param => param && Object.keys(param).forEach(key => forEach(key, param[`${key}`])))

/**
 * 构建get请求参数
 * @param {*} url 地址
 * @param {*} params 请求对象
 */
export const buildGetParam = (url, ...params) => {
  let query = []
  forEachParam((key, val) => {
    if (isObj(val)) {
      forEachParam((_key, _val) => {
        query.push(`${encodeURIComponent(key)}[${encodeURIComponent(_key)}]=${encodeURIComponent(_val)}`)
      }, val)
    } else if (isArray(val)) {
      val.forEach(_val => {
        query.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(_val)}`)
      })
    } else {
      query.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
    }
  }, ...params)
  if (query.length === 0) return url
  return `${url}?${query.join('&')}`
}

/**
 * 构建post请求参数
 * @param {*} params 请求对象
 */
export const buildPostParam = (...params) => {
  let data = new FormData()
  forEachParam((key, val) => {
    if (isObj(val)) {
      forEachParam((_key, _val) => {
        data.append(`${key}[${_key}]`, _val)
      }, val)
    } else if (isArray(val)) {
      val.forEach(_val => {
        data.append(`${key}[]`, _val)
      })
    } else {
      data.append(key, val)
    }
  }, ...params)
  return data
}
