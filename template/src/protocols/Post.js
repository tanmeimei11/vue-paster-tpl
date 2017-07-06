import DirectiveProtocol from './DirectiveProtocol'

export default class Post extends DirectiveProtocol {
  static directiveKey = `__IUI_POST_PROTOCOL_HANDLE__` 
  static directiveName = `iLinkPost` 

  constructor (params) {
    if (typeof(params) === 'string') {
      params = {postId: params}
    }
    params['pid'] = params['postId'] 

    if (params[`refresh`] === undefined) {
      params[`refresh`] = 0
    }
    super(params)
    this._scheme = 'in://photodetail'
    this._href = '//h5.in66.com/inpromo/inweb/in-share/share.html' 
  }
}

export const iLinkPost = Post.directive(Post) 
