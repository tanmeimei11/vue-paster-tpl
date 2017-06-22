import {
  env
} from '../../config'
export const iuiAlias = {
  'iConfig': env.assetsPath('src/iConfig'),
  'iMixins': 'i-ui/src/mixins',
  'iScss': 'i-ui/src/scss',
  'iFiters': 'i-ui/src/fiters',
  'iExtends': 'i-ui/src/extends',
  'iUtil': 'i-ui/src/utils'
}

export const aliasObject = Object.assign(iuiAlias, {
  'src': env.assetsPath('src'),
  'assets': env.assetsPath('src/assets'),
  'actions': env.assetsPath('src/actions'),
  'components': env.assetsPath('src/components'),
  'units': env.assetsPath('src/units'),
  'stores': env.assetsPath('src/stores'),
  'directives': env.assetsPath('src/directives'),
  'mixins': env.assetsPath('src/mixins'),
  'extends': env.assetsPath('src/extends'),
  'mocks': env.assetsPath('src/mocks'),
  'config': env.assetsPath('src/config')
})
