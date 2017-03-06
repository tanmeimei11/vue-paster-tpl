export default function hintMessage (msg, millisecond = 3000) {
  let dom = document.getElementsByClassName('hint-box')[0]
  if (dom) {
    document.body.removeChild(dom)
  }
  let hitEle = document.createElement('div')
  hitEle.setAttribute('class', 'hint-box')
  hitEle.innerText = msg
  document.body.appendChild(hitEle)
  setTimeout(function () {
    document.body.removeChild(hitEle)
  }, millisecond)
}
