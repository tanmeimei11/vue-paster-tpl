import Vue from 'vue'
import App from './App'
import { initPage } from 'units/common'
import 'assets/scss/reset.scss'

initPage(Vue, {})

new Vue({
  render: h => h(App)
}).$mount('#app')
