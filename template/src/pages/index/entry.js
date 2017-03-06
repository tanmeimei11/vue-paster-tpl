import { polyfill } from 'es6-promise'
import Vue from 'vue'
import App from './App'
import { initPage } from 'units/common'
import 'assets/scss/reset.scss'
import 'whatwg-fetch'
polyfill()

initPage(Vue, {})

new Vue({
  render: h => h(App)
}).$mount('#app')
