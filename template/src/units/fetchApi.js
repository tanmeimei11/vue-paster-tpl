import {
  buildGetParam,
  buildPostParam,
  loadingPromise
} from './params'
import {
  U_IN,
  U_IN_QA
} from 'iConfig'
import {
  apiMap,
  apiCommonParam
} from 'config'

/**
 * 授权重定向
 * @param {*} json 返回json
 */
const authorized = json => {
  if (!json.succ && json.data && json.data.status === 302) {
    location.href = json.data.location
    throw json
  }
  return json
}
/**
 * 构建fetch请求
 * @param {object} options 
 */
const buildFetchPromise = options => fetch(options.url, options).then(res => res.json()).then(authorized)

/**
 * 构建XMLHTTP请求
 * @param {object} options 
 */
const buildXMLHTTPPromise = options => new Promise((resolve, reject) => {
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.withCredentials = true
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState !== 4) return
    if ((xmlhttp.status >= 200 && xmlhttp.status < 300)) {
      let result = (xmlhttp.responseType === 'arraybuffer' || xmlhttp.responseType === 'blob') ? xmlhttp.response : xmlhttp.responseText
      try {
        if (xmlhttp.getResponseHeader('content-type') === 'application/json') {
          result = JSON.parse(result)
        }
      } catch (e) {}
      resolve(result)
    } else {
      reject(new Error(xmlhttp.statusText || null))
    }
  }
  xmlhttp.onabort = xmlhttp.onerror = () => {
    reject(new Error(xmlhttp.status))
  }
  xmlhttp.open(options.method, options.url, true)
  xmlhttp.send(options.body)
}).then(authorized)

/**
 * 构建请求方法（每个请求每次只能执行一次）
 * @param {Object} commonParam 公共参数
 * @param {String} urls 请求地址
 * @param {Object} opt 关于请求的配置
 */
const FetchApi = (commonParam, urls, opt) => {
  // 如果是qa访问 {{U_IN_QA}} 如果是线上则访问 {{U_IN}} 否则是本地
  let host = /^qa/.test(location.host) ? U_IN_QA : (process.env.NODE_ENV === 'production' ? U_IN : '')
  let urlObj = {}

  Object.keys(urls).forEach(urlKey => {
    let reqUrlInfo = urls[`${urlKey}`]
    let reqUrl = `${host}${reqUrlInfo.url || reqUrlInfo}`
    let requestDone = (res) => {
      urlObj[`${urlKey}`].loading = false
      return res
    }
    urlObj[`${urlKey}`] = (param = {}, { method, type } = {}) => {
      // 判断是不是使用fetch
      let isFetch = /fetch/i.test(type || reqUrlInfo.type || 'fetch')
      // 判断是不是get方法
      let isGet = /get/i.test(method || reqUrlInfo.method || 'get')
      let options = {
        url: isGet ? buildGetParam(reqUrl, commonParam, param) : reqUrl,
        credentials: 'include',
        method: isGet ? 'GET' : 'POST',
        body: isGet ? null : buildPostParam(commonParam, param),
        headers: {}// 'X-Requested-With': 'XMLHttpRequest' 当后端需要判断是否为ajax的时候添加
      }
      if (urlObj[`${urlKey}`].loading) return loadingPromise(`${reqUrl} RequsetIng`)
      urlObj[`${urlKey}`].loading = true
      return (isFetch ? buildFetchPromise : buildXMLHTTPPromise)(options).then(res => requestDone(res), err => requestDone(err))
    }
  })
  return urlObj
}

export const api = FetchApi(apiCommonParam, apiMap)

export const apiPromise = (options) => {
  options.params = options.params || {}
  return new Promise((resolve, reject) => {
    api[options.name](options.params).then(res => {
      if (res.succ) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  })
}
export const polling = (options) => {
  let timeOut = setTimeout(() => {
    apiPromise(options).then((result) => {
      if (timeOut) clearTimeout(timeOut)
      options.succ && options.succ(result)
      if (!(options.isStop && options.isStop()) || !options.isStop) polling(options)
    }, err => console.log(err))
  }, options.interval || 2000)
}
