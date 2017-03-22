import { buildGetParam, buildPostParam } from './build'
import { U_IN, U_IN_QA } from 'iConfig'
/**
 * 构建请求方法（每个请求每次只能执行一次）
 * @param {Object} baseParam
 * @param {String} urls 请求地址
 * @param {function} error
 */
const FetchApi = (baseParam, urls, error = (err) => {
  throw err
}) => {
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
    urlObj[`${urlKey}`] = (param = {}, type = 'get') => {
      let url = `${host}${urls[`${urlKey}`]}`
      let options = {
        credentials: 'include',
        headers: {
          // 'X-Requested-With': 'XMLHttpRequest'
        }
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

// 通用错误
const error = error => {
  throw error
}

// 通用参数
const baseParam = {
  promo_name: '{{ name }}'
}

/**
 *  请求地址
 */
export const URL = FetchApi(baseParam, {
  xxx: `/test`
}, error)
