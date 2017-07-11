export default ({
  types
}) => {
  return {
    visitor: { 
      ImportDeclaration (path, {
        opts
      }) {
        if (path.node.source.value !== opts.libraryName) return
        let prefix = `${opts.libraryName}/${opts.libDir}/`
        path.node.specifiers.forEach((val, idx) => {
          if (idx === 0) {
            path.node.specifiers = [types.ImportDefaultSpecifier(types.identifier(val.local.name))]
            path.node.source.value = prefix + val.local.name
          } else {
            path.parent.body.push(types.ImportDeclaration([
              types.ImportDefaultSpecifier(types.identifier(val.local.name))
            ], types.StringLiteral(prefix + val.local.name)))
          }
        })
      }
    }
  }
}
