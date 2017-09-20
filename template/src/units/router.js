import { dynamic } from 'dva-vue'
import { routers } from '../config.js'
const toFirUpper = word => word.replace(/(\w)\w+$/, (word, letter) => word.replace(letter, letter.toUpperCase()))
export default function RouterConfig ({
  history,
  app
}) {
  const asyncComponent = (modelUrl, comptUrl) => dynamic({
    app,
    models: () => [new Promise(resolve => require.ensure([], () => {
      resolve(require(`../models/${modelUrl}`).default)
    }, 'router'))],
    component: () => new Promise(resolve => require.ensure([], () => {
      resolve(require(`../routes/${(comptUrl || toFirUpper(modelUrl))}.vue`).default)
    }, 'router'))
  })
  return [{
    path: '/',
    component: asyncComponent(routers.main)
  }].concat(routers.pages.map(page => ({
    path: `/${page}`,
    component: asyncComponent(page)
  })))
}
