import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPosts, initializePosts } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { login, logout } from './reducers/user'
import { showNotification } from './reducers/notificationsReducer'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

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

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: #383838;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`
const Logged = styled.div`
  background: #aae0e0;
  padding: 0.5em;
  font-size: 1em;
  display: flex;
  justify-content: flex-end;
`
const SmallButton = styled.button`
  font-weight: bold;
  width: fit-content;
  background-color: #50a3a2;
  color: white;
  padding: 8px 12px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #228a89;
  }
`
const StyledLink = styled(Link)`
  color: #228a89;
  font-weight: bold;
  margin: 1em;
  text-decoration: none;
  border: 2px solid #228a89;
  padding: 0.5em;
  &:hover {
    border: 2px dotted #228a89;
    color: #07504f;
  }
`
const Title = styled.h2`
 padding: 1em;
  text-align: center;
`

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
        <h2>Bloglist application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <Router>
      <GlobalStyle />
      <Logged>
        <p>
          {user.name} logged in <SmallButton onClick={handleLogout}>Logout</SmallButton>
        </p>
      </Logged>
      <div>
        <StyledLink to='/blogs'>blogs</StyledLink>
        <StyledLink to='/users'>users</StyledLink>
      </div>
      <Title>All blogs</Title>
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
          <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <Blogs />
        </Route>
      </Switch>
    </Router>
  )
}

export default App