import * as fetch from '../units/fetchApi'
export const api = {
  created: function () {
    this.$api = fetch.api
    this.$apiPromise = fetch.apiPromise
  },
  methods: {
    polling (options) {
      fetch.polling(options)
    }
  } 
}
// this.$api.getUser({page: 1, page_size: 3})
// this.$apiPromise({name: 'getUser', params: {page: 1, page_size: 3}}).then(() => {
//   console.log(0)   
// }, () => {
//   console.log(11)   
// })
// this.polling({
//   name: 'getUser', 
//   params: {page: 1, page_size: 3}, 
//   succ: () => {
//     console.log(123)
//   },
//   isStop: () => {
//     return false
//   }
// })
