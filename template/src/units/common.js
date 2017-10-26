import { shareMap, C_IN, U_IN_WXSDK, U_TRACK, QNTokenUrl, apiCommonParam, apiMap } from '../config'
import { Share, buildtrack, FetchApi, buildUploadQiniu } from 'common-utils'
export { awake, app, common, is } from 'common-utils'

let share = new Share({sdkUrl: U_IN_WXSDK, trackUrl: U_TRACK})
export const shareApi = (share.config = shareMap, share) 

export const serverApi = FetchApi(apiCommonParam, apiMap, {
  host: C_IN
})
export const qiniuApi = buildUploadQiniu(QNTokenUrl)
export const trackApi = buildtrack(U_TRACK)
/**
 * 路由操作
 * @param {*} method 方法 
 * @param {*} pathname 地址参数
 */
export const history = (method, pathname) => ({type: '@@router/CALL_HISTORY_METHOD',
  payload: {
    method: method,
    args: [pathname]
  }
})
