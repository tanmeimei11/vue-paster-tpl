import DirectiveProtocol from './DirectiveProtocol'

export default class Live extends DirectiveProtocol {
  static directiveKey = `__IUI_LIVE_PROTOCOL_HANDLE__` 
  static directiveName = `iLinkLive`

  constructor (params) {
    if (typeof(params) === 'string') {
      params = {liveId: params}
    }
    params['liveid'] = params['liveId']

    super(params)
    this._scheme = 'in://live/audience'
    this._href = '//www.in66.com/intv' 
  }

  get link () {
    this._link = `${this._href}/${this._params['liveId']}`
    return this._link
  }

}

export const iLinkLive = Live.directive(Live) 
