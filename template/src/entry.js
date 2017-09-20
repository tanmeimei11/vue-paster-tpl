import app from './units/InDva'
{{#if_eq analytics "yes"}}
// 网页监控sdk
import 'analytics'
{{/if_eq}}
{{#if_eq growingIO "yes"}}
// 活动必须的growingio埋点
import 'assets/libs/growingio.js'
{{/if_eq}}
import { trackApi, awake } from './units/common'
import toast from './units/toast'
app.use(toast)
app.use({
  onError (error) {
    console.error(error.message)
  },
  onAction () {
    return next => action => { 
      if (action.type === 'TRACK') {
        trackApi(action.payload)
      } else if (action.type === 'AWAKE') {
        awake(action.payload)
      } 
      return next(action)
    }
  }
})
app.start('.page')
