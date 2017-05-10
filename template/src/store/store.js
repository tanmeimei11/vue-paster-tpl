import API from 'actions'

const state = {
  count: 0,
  increTimes: 0,
  decreTimes: 0,
  user: {},
  loginMsg: ''
}

const actions = {
  increment: ({
    commit
  }) => commit('increment'),
  decrement: ({
    commit
  }) => commit('decrement'),
  getUser ({
    commit
  }) {
    API.getUser()
      .then((res) => {
        if (res.succ) {
          commit('getUser', res.data)
        } else {
          commit('getNoUser')
        }
      })
  }
}

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
    state.user = {
      id: user.id,
      name: user.nick
    }
  },
  getNoUser (state) {
    state.loginMsg = 'not log'
  }
}

export default {
  state,
  actions,
  mutations
}
