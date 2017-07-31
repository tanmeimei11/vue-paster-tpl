window.contentLoaded = function (fn) {
  var done = false
  var top = true

  var doc = window.document
  var root = doc.documentElement
  var modern = doc.addEventListener

  var add = modern ? 'addEventListener' : 'attachEvent'
  var rem = modern ? 'removeEventListener' : 'detachEvent'
  var pre = modern ? '' : 'on'

  var init = function (e) {
    if (e.type === 'readystatechange' && doc.readyState !== 'complete') return;
    (e.type === 'load' ? window : doc)[rem](pre + e.type, init, false)
    if (!done && (done = true)) fn.call(window, e.type || e)
  }

  var poll = function () {
    try { root.doScroll('left') } catch (e) { setTimeout(poll, 50); return }
    init('poll')
  }

  if (doc.readyState === 'complete') fn.call(window, 'lazy')
  else {
    if (!modern && root.doScroll) {
      try { top = !window.frameElement } catch (e) { }
      if (top) poll()
    }
    doc[add](pre + 'DOMContentLoaded', init, false)
    doc[add](pre + 'readystatechange', init, false)
    window[add](pre + 'load', init, false)
  }
}
