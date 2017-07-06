import Protocol from './Protocol'
import awake from 'i-ui/src/utils/jsBridge'
import common from 'i-ui/src/utils/common'

export default class DirectiveProtocol extends Protocol {
  static _unbind = function (el, binding, _v) {
    el.removeEventListener('touchstart', el[`${this.directiveKey}`])
  }

  static _directive = function (el, binding, _v) {
    let source = new this(binding.value) 
      el.removeEventListener('touchstart', el[`${this.directiveKey}`])
      el[`${this.directiveKey}`] = () => {
        if (binding.modifiers.protocol) {
          awake(source.protocol)
        } else if (binding.modifiers.href) {
          location.href = source.link 
        } else {
          if (common.isInApp) {
            awake(source.protocol)
          } else {
            location.href = source.link 
          } 
        }

      }
    el.addEventListener('touchstart', el[`${this.directiveKey}`])
  }

  static directive = function (clazz) {
    return {
      name: clazz.directiveName,
      bind: DirectiveProtocol._directive.bind(clazz),
      updated: DirectiveProtocol._directive.bind(clazz),
      componentUpdated: DirectiveProtocol._directive.bind(clazz),
      unbind: DirectiveProtocol._unbind.bind(clazz)
    }
  }

}
