import InVue from 'extends/inVue'
{{#if_eq vuex "yes"}}
import store from 'stores'
{{/if_eq}}
import App from './App.vue'
new InVue({
  {{#if_eq vuex "yes"}}
  store,
  {{/if_eq}}
  render: h => h(App)
}).$mount('#app')
