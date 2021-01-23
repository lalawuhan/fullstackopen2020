import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationsReducer from './reducers/notificationsReducer.js'
import blogsReducer from './reducers/blogsReducer.js'
import usersReducer from './reducers/usersReducer.js'

const reducers = combineReducers({
  message: notificationsReducer,
  posts: blogsReducer,
  users: usersReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store