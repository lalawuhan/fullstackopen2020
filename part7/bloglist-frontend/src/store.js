import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationsReducer from './reducers/notificationsReducer.js'
import blogsReducer from './reducers/blogsReducer.js'

const reducers = combineReducers({
  message: notificationsReducer,
  posts: blogsReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store