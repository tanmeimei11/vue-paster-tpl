import {
  buildGetParam,
  buildPostParam,
  loadingPromise,
  timeoutPromise
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
 * 停止请求
 * @param {*} _fecth 
 */
const buildAbortPromise = _fecth => new Promise((resolve, reject) => {
  _fecth.abort = err => {
    _fecth.loading = false
    if (_fecth.xmlhttp instanceof XMLHttpRequest) {
      _fecth.xmlhttp.abort()
    }
    if (!(err instanceof Error)) {
      err = new Error(err)
    }
    reject(err)
  }
})

/**
 * 构建fetch请求
 * @param {string} url 
 * @param {object} options 
 * @param {function} done 
 */
const buildFetchPromise = (url, options, done = () => {}) => fetch(url, options).then(res => {
  done()
  return res
}, err => {
  done()
  throw err
}).then(res => res.json()).then(res => {
  // 授权重定向
  if (!res.succ && res.data && res.data.status === 302) {
    location.href = res.data.location
    throw res
  }
  return res
})

/**
 * 构建XMLHTTP请求
 * @param {object} _fetch 
 * @param {string} url 
 * @param {object} options 
 * @param {function} done 
 */
const buildXMLHTTPPromise = (_fetch, url, options, done = () => {}) => new Promise((resolve, reject) => {
  let xmlhttp = new XMLHttpRequest()
  xmlhttp.withCredentials = true
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === 4) {
      done()
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
  }
  xmlhttp.onabort = xmlhttp.onerror = () => {
    done()
    reject(new Error(xmlhttp.status))
  }
  xmlhttp.open(options.method, url, true)
  xmlhttp.send(options.body)
  _fetch.xmlhttp = xmlhttp
})

/**
 * 构建请求方法（每个请求每次只能执行一次）
 * @param {Object} commonParam 公共参数
 * @param {String} urls 请求地址
 * @param {Object} opt 关于请求的配置
 */
const FetchApi = (commonParam, urls, opt) => {
  /**
   *  如果是qa访问 qa.in66.com 如果是线上则访问 www.in66.com 否则是本地
   */
  let host = /^qa/.test(location.host) ? U_IN_QA : (process.env.NODE_ENV === 'production' ? U_IN : '')
  let urlObj = {}
  Object.keys(urls).forEach(urlKey => {
    urlObj[`${urlKey}`] = (param = {}, type = 'get', useFetch = true) => {
      let url = `${host}${urls[`${urlKey}`]}`
      let isGet = /get/i.test(type)
      let _fetch = urlObj[`${urlKey}`]
      let options = {
        credentials: 'include',
        method: isGet ? 'GET' : 'POST',
        body: isGet ? null : buildPostParam(commonParam, param),
        headers: {
          // 'X-Requested-With': 'XMLHttpRequest' 当后端需要判断是否为ajax的时候添加
        }
      }
      if (isGet) url = buildGetParam(url, commonParam, param)
      if (_fetch.loading) return loadingPromise()
      _fetch.loading = true
      let timeout = _fetch.timeout
      let timeoutId = 0
      let doneFetch = () => { clearTimeout(timeoutId); _fetch.loading = false }
      let promiseArr = [new Promise((resolve, reject) => {
        if (timeout !== undefined && opt.needTimeOut) { 
          timeoutId = setTimeout(() => { doneFetch(); resolve(timeoutPromise()) }, timeout)
        }
        if (useFetch) {
          resolve(buildFetchPromise(url, options, doneFetch))
        } else {
          resolve(buildXMLHTTPPromise(_fetch, url, options, doneFetch))
        }
      })]
      if (opt.needAbort) promiseArr.push(buildAbortPromise(_fetch))
      return Promise.race(promiseArr)
    }
  })
  return urlObj
}

/**
 * 导出 api ，默认不需要abort和timeout 
 */
export const api = FetchApi(apiCommonParam, apiMap, {
  needAbort: false,
  needTimeOut: false
})

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
