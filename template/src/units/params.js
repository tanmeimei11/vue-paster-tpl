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
 * @param {object} param 
 * @param {function} append 
 */
const analyseParam = (param, append) => buildParam('', param, append)

/**
 * 构建参数 
 * @param {string} prefix 
 * @param {object} param
 * @param {function} append 
 */
const buildParam = (prefix, param, append) => {
  if (isObj(param)) {
    Object.keys(param).forEach(key => {
      let _prefix = prefix === '' ? key : `${prefix}[${key}]`
      buildParam(_prefix, param[`${key}`], append)
    })
  } else if (isArray(param)) {
    param.forEach((key, idx) => {
      let _idx = isObj(key) || isArray(key) ? idx : ``
      buildParam(`${prefix}[${_idx}]`, key, append)
    })
  } else {
    append(`${prefix}`, param)
  }
}

/**
 * 构建get请求参数
 * @param {*} url 地址
 * @param {*} params 请求对象
 */
export const buildGetParam = (url, ...params) => {
  let query = []
  params.forEach(param => analyseParam(param, (key, val) => {
    query.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
  }))
  if (query.length === 0) return url
  return `${url}?${query.join('&')}`
}

/**
 * 构建post请求参数
 * @param {*} params 请求对象
 */
export const buildPostParam = (...params) => {
  let data = new FormData()
  params.forEach(param => analyseParam(param, (key, val) => {
    data.append(key, val)
  }))
  return data
}
