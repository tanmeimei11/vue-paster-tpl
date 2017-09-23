function removeToastDom () {
  let oldDom = document.getElementsByClassName('hint-box')[0]
  oldDom && document.body.removeChild(oldDom)
}
      
function toast (msg, millisecond = 3000) {
  removeToastDom()
  let hitEle = document.createElement('div')
  hitEle.setAttribute('class', 'hint-box')
  hitEle.innerHTML = msg
  document.body.appendChild(hitEle)
  setTimeout(removeToastDom, millisecond)
}
    
export default {
  onAction () {
    return next => action => { 
      if (action.type === 'toast') {
        toast(action.payload)
      }
      return next(action)
    }
  }
}
