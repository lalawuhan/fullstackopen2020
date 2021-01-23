import React, { useState, useEffect } from 'react'
import { showNotification } from './reducers/notificationsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createPosts, initializePosts, removePost } from './reducers/blogsReducer'
import { addUser } from './reducers/usersReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

const App = () => {
  const dispatch = useDispatch()
  const { blogs, user } = useSelector(state => { return { blogs: state.posts, user: state.users } })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializePosts())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(addUser(user))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(addUser(user))

      dispatch(showNotification(`${user.name} welcome back!`))
      storage.saveUser(user)
    } catch (exception) {
      dispatch(showNotification('wrong username/password', 'error'))
    }
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createPosts(blog))
      dispatch(showNotification(`a new blog '${blog.title}' by ${blog.author} added!`))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    console.log('id', blogToLike)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch(initializePosts())
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removePost(id))
    }
  }

  const handleLogout = () => {
    dispatch(addUser(null))
    storage.logoutUser()
  }

  if (!user) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
        />
      )}
    </div>
  )
}

export default App