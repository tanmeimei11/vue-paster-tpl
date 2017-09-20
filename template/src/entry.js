import app from './units/InDva'
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
