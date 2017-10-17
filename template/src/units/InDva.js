import dva from 'dva-vue'
import router from './router'
import { app as inApp } from './common'
const app = dva()
app.model({
  namespace: 'app',
  state: {},
  subscriptions: {
    setup ({ dispatch, history }) {
      console.log(history)
    }
  }
})
app.router(router)
inApp.initIn()
export default app
