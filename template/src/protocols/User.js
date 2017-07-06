import DirectiveProtocol from './DirectiveProtocol'

export default class User extends DirectiveProtocol {
  static directiveKey = `__IUI_USERPROTOCOL_HANDLE__` 
  static directiveName = `iLinkUser`

  constructor (params) {
    if (typeof(params) === 'string') {
      params = {userId: params}
    }
    params['uid'] = params['userid'] = params['userId']

    if (params[`refresh`] === undefined) {
      params[`refresh`] = 0
    }
    super(params)
    this._scheme = 'in://diary/other'
    this._href = '//h5.in66.com/inpromo/inweb/in-share/in.html' 
  }
}

export const iLinkUser = User.directive(User) 
