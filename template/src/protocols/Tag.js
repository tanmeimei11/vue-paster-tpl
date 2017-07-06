import DirectiveProtocol from './DirectiveProtocol'

export default class Tag extends DirectiveProtocol {
  static directiveKey = `__IUI_TAG_PROTOCOL_HANDLE__` 
  static directiveName = `iLinkTag`

  constructor (params) {
    if (typeof(params) === 'string') {
      params = {tagId: params}
    }
    params['tagid'] = params['tagId']

    if (params[`refresh`] === undefined) {
      params[`refresh`] = 0
    }
    if (params[`cuid`] === undefined) {
      params[`cuid`] = '1XBxjgXw' 
    }
    super(params)
    this._scheme = 'in://tag'
    this._href = '//h5.in66.com/inpromo/inweb/tag-share/index.html' 
  }
}

export const iLinkTag = Tag.directive(Tag)  
