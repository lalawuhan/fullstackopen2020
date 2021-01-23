import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationsReducer.js'

const reducers = combineReducers({
  message: notificationReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store