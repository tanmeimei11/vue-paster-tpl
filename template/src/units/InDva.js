import dva from 'dva-vue'
import router from './router'
import { app as inApp, is } from './common'
const app = dva()
app.model({
  namespace: 'app',
  state: {},
  subscriptions: {
    setup ({ dispatch, history }) {
      return history.block(({pathname, search}, action) => {
        if (action === 'REPLACE') {
          return true
        }
        // 如果是in 则刷新 否则不改
        if (is.inApp) {
          location.hash = `${pathname}${search}`
          location.reload()
          return false
        }
      })
    }
  }
})
app.router(router)
inApp.initIn()
export default app
