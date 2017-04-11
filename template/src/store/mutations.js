const mutations = {
  increment (state) {
    state.count++
    state.increTimes++
  },
  decrement (state) {
    state.count--
    state.decreTimes++
  },
  getUser (state, user) {
    console.log('11')
    state.user = {
      id: user.id,
      name: user.nick
    }
  },
  getNoUser (state) {
    state.loginMsg = 'not log'
  }
}
export default mutations
