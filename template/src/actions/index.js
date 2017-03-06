import {
  buildFetch
} from './build'

// 通用错误
const error = () => {

}

// 通用参数
const baseParam = {
  promo_name: '{{ name }}'
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
export const URL = buildFetch(baseParam, {
  xxx: `${host}/test`
}, error)
