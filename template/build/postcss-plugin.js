import postcss from 'postcss'

// 修改dpr
export const dataDpr = postcss.plugin('postcss-dataDpr', function (opts) {
  const createSelector = (selector, decl, dpr = 2) => {
    decl.value = decl.value.replace(/(\d)PX/, (reg, num) => `${num * dpr}PX`)
    return {
      selector: `[data-dpr="${dpr}"] ${selector}`,
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
