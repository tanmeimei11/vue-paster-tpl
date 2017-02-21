import Vue from 'vue'
import App from './App'
import iTrack from 'i-ui/src/directives/iTrack'
console.log(iTrack)
new Vue({
  el: '#app',
  render: h => h(App)
})
