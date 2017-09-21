import postcss from 'postcss'

// px2rem
export const px2rem = postcss.plugin('postcss-px2rem', function (options) {
  return function (root, result) {
    var oldCssText = root.toString()
    var newCssText = oldCssText.replace(/(\d+)px/g, (reg, num) => 
      `${Math.ceil((num / options.remUnit) * 1000) / 1000}rem`)
    result.root = postcss.parse(newCssText)
  }
})

// 修改dpr
export const dataDpr = postcss.plugin('postcss-dataDpr', function (opts) {
  const createSelector = (selector, decl, dpr = 2) => {
    decl.value = decl.value.replace(/(\d)PX/, (reg, num) => `${num * dpr}PX`)
    return {
      selector: selector.split(',').map(_selector => `[data-dpr="${dpr}"] ${_selector}`).join(','),
      nodes: [decl]
    }
  }
  return function (root, result) {
    root.walkComments(comment => {
      let declare = comment.next()
      if (/dpr/.test(comment.text) && declare && declare.type === 'decl') {
        root.append(createSelector(comment.parent.selector, declare.clone(), 2))
        root.append(createSelector(comment.parent.selector, declare.clone(), 3))
      }
      comment.remove()
    })
    return result
  }
})
