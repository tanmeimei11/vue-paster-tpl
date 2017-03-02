import { env } from '../config'
export const iuiAlias = {
  'iConfig': env.assetsPath('src/iconfig'),
  'iComponents': env.assetsPath('i-ui/src/components'),
  'iDirectives': env.assetsPath('i-ui/src/directives'),
  'iMixins': env.assetsPath('i-ui/src/minins'),
  'iFiters': env.assetsPath('i-ui/src/fiters'),
  'iUtil': env.assetsPath('i-ui/src/util')
}


export const aliasObject = Object.assign(iuiAlias, {
  'src': env.assetsPath('src'),
  'assets': env.assetsPath('src/assets'),
  'components': env.assetsPath('src/components')
})


/**
 * a
 */
export const a = () => {
  console.log(1)
}
