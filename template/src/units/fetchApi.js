import {
  buildGetParam,
  buildPostParam
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
 * 构建请求方法（每个请求每次只能执行一次）
 * @param {Object} baseParam
 * @param {String} urls 请求地址
 */
const FetchApi = (baseParam, urls) => {
  /**
   * 如果是线上则访问 www.in66.com
   */
  let host = process.env.NODE_ENV === 'production' ? U_IN : ''
  /**
   * 如果是qa访问 qa.in66.com
   */
  if (/^qa/.test(location.host)) {
    host = U_IN_QA
  }
  let urlObj = {}
  Object.keys(urls).forEach(urlKey => {
    urlObj[`${urlKey}`] = (param = {}, type = 'get', useFetch = true) => {
      let url = `${host}${urls[`${urlKey}`]}`
      let options = {
        credentials: 'include',
        headers: {
          // 'X-Requested-With': 'XMLHttpRequest'
        }
      }
      if (type === 'get') {
        options.method = 'GET'
        options.body = null
        url = buildGetParam(url, baseParam, param)
      } else {
        options.method = 'POST'
        options.body = buildPostParam(baseParam, param)
      }
      if (urlObj[`${urlKey}`].loading) {
        return new Promise((resolve, reject) => {
          reject(new Error('fetch loading'))
        })
      }
      urlObj[`${urlKey}`].loading = true
      let timeout = urlObj[`${urlKey}`].timeout
      let timeoutId = 0
      /* abort */
      let abortPromise = new Promise((resolve, reject) => {
        urlObj[`${urlKey}`].abort = err => {
          urlObj[`${urlKey}`].loading = false
          if (urlObj[`${urlKey}`].xmlhttp instanceof XMLHttpRequest) {
            urlObj[`${urlKey}`].xmlhttp.abort()
          }
          if (!(err instanceof Error)) {
            err = new Error(err)
          }
          reject(err)
        }
      })
      /* normal */
      let fetchPromise = new Promise((resolve, reject) => {
        if (timeout !== undefined) {
          timeoutId = setTimeout(() => reject(new Error('fetch timeout')), timeout)
        }
        if (useFetch) {
          resolve(fetch(url, options).then(res => {
            clearTimeout(timeoutId)
            urlObj[`${urlKey}`].loading = false
            return res
          }, err => {
            clearTimeout(timeoutId)
            urlObj[`${urlKey}`].loading = false
            throw err
          }).then(res => res.json()).then(res => {
            // 授权重定向
            if (!res.succ && res.data && res.data.status === 302) {
              location.href = res.data.location
              throw res
            }
            return res
          }))
        } else {
          let xmlhttp = new XMLHttpRequest()
          xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
              clearTimeout(timeoutId)
              urlObj[`${urlKey}`].loading = false
              if ((xmlhttp.status >= 200 && xmlhttp.status < 300)) {
                let result = (xmlhttp.responseType === 'arraybuffer' || xmlhttp.responseType === 'blob') ? xmlhttp.response : xmlhttp.responseText
                try {
                  if (xmlhttp.getResponseHeader('content-type') === 'application/json') {
                    result = JSON.parse(result)
                  }
                } catch (e) {}
                resolve(result)
              } else {
                resolve(xmlhttp.statusText || null)
              }
            }
          }
          xmlhttp.open(options.method, url, true)
          xmlhttp.send(options.body)
          urlObj[`${urlKey}`].xmlhttp = xmlhttp
        }
      })
      return Promise.race([abortPromise, fetchPromise])
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
    apiPromise(options).then(
      (result) => {
        if (timeOut) {
          clearTimeout(timeOut)
        }
        options.succ && options.succ(result)
        if (!(options.isStop && options.isStop()) || !options.isStop) {
          polling(options)
        }
      },
      (err) => {
        console.log(err)
      })
  }, options.interval || 2000)
}
