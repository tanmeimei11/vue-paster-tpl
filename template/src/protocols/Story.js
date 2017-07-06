import DirectiveProtocol from './DirectiveProtocol'

export default class Story extends DirectiveProtocol {
  static directiveKey = `__IUI_STORY_PROTOCOL_HANDLE__` 
  static directiveName = `iLinkStory`

  constructor (params) {
    if (typeof(params) === 'string') {
      params = {storyId: params}
    }
    params['story_id'] = params['storyid'] = params['sid'] = params['storyId'] = params['storyId']

    if (params[`uid`] === undefined) {
      params[`uid`] = '74026136' 
    }
    if (params[`refresh`] === undefined) {
      params[`refresh`] = 0
    }
    super(params)
    this._scheme = 'in://story/detail'
    this._href = '//www.in66.com/story/detail' 
  }
}

export const iLinkStory = Story.directive(Story) 
