import {
  trackParam
} from 'iUtil/track'

const xpath = el => {
  if (el.nodeName === 'BODY') return ['']
  let encodePath = encodeURIComponent(`${el.nodeName.toLowerCase()}${el.id ? `#${el.id}` : ''}${el.className ? `.${el.className}` : ''}`)
  return [...xpath(el.parentNode), encodePath]
}

const bindEvent = (el, binding) => {
  return event => {
    trackParam(`${trackClick.options.track}${xpath(event.target).join('_')}_click`)
    binding.value()
    if (binding.modifiers.stop) {
      event.stopPropagation()
    }
    if (binding.modifiers.prevent) {
      event.preventDefault()
    }
    if (binding.modifiers.once) {
      el.removeEventListener('click', el[`${trackClick.key}`])
    }
  }
}

const trackClick = {
  name: 'trackClick',
  key: '__TRACK_CLICK_HANDLE__',
  options: {},
  install (Vue, options) {
    trackClick.options = {
      ...this.options,
      ...options
    }
    Vue.directive(trackClick.name, trackClick)
  },
  bind (el, binding, _v) {
    el[`${trackClick.key}`] = bindEvent(el, binding)
    el.addEventListener('click', el[`${trackClick.key}`])
  },
  updated (el, binding, _v) {
    el[`${trackClick.key}`] = bindEvent(el, binding)
  },
  componentUpdated (el, binding, _v) {
    el[`${trackClick.key}`] = bindEvent(el, binding)
  },
  unbind (el, binding, _v) {
    el.removeEventListener('click', el[`${trackClick.key}`])
  }
}

export default trackClick
