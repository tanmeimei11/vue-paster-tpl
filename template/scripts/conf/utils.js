 import {
  posix
} from 'path'
 import {
  env
} from '../../config'
 const upfirlet = word => word.replace(/^\w{1}/, letter => letter.toUpperCase())
 const iuiSrc = (...url) => posix.join('i-ui', 'src', ...url)
 const src = (...url) => env.assetsPath('src', ...url)
 const iuiPath = [
   'mixins', 'scss', 'fiters', 'extends',
   'protocols', 'plugins', 'utils'
 ]
 const srcPath = [
   'assets', 'actions', 'components', 'units', 'stores', 
   'directives', 'mixins', 'extends', 'mocks', 'config'
 ]
 const iuiAlias = {
   'iConfig': src('config')
 }
 const aliasObject = Object.assign(iuiAlias, {
   'src': env.assetsPath('src')
 })
 iuiPath.forEach(key => {
   iuiAlias[`i${upfirlet(key)}`] = iuiSrc(key)
 })
 srcPath.forEach(key => {
   aliasObject[`key`] = src(key)
 })
 export {
  aliasObject
}
