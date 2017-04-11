import 'whatwg-fetch'
import {
  URL
} from 'actions/index'

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
    URL.getUser()
      .then((res) => {
        if (res.succ) {
          commit('getUser', res.data)
        } else {
          commit('getNoUser')
        }
      })
  }
}
export default actions
