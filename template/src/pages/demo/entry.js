import InVue from '../../extends/in.js'
import App from './App.vue'
// import 'mocks'

new InVue({
  render: h => h(App)
}).$mount('#app')
