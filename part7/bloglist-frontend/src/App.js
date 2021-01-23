import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createPosts, initializePosts } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login, logout } from './reducers/user'
import { showNotification } from './reducers/notificationsReducer'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import storage from './utils/storage'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializePosts())
    dispatch(initializeUsers())
    const user = storage.loadUser()
    if (user) {
      dispatch(login(user))
    }
  }, [dispatch])

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createPosts(blog))
      dispatch(showNotification(`a new blog '${blog.title}' by ${blog.author} added!`))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    dispatch(logout(null))
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>Please login</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>Logout</button>
        </p>
      </div>
      <Link to='/blogs'>blogs</Link>
      <Link to='/users'>users</Link>
      <h2>Blogs</h2>
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path="/">
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <Blogs/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App