import React, { useState, useEffect, useRef } from 'react'
// import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import Toggleable from './components/Toggleable';
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log('blogs', blogs.map((blog) => blog.title))
      setBlogs(blogs)
    }

    )
  }, [])

  const addPost = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
        .create(blogObject)
        .then(returnedPost => {
          setBlogs(blogs.concat(returnedPost))        }
          )
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const loginForm = () => (
    <Toggleable buttonLabel='login' >
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Toggleable>
  )

  const blogForm = () => (
    <Toggleable buttonLabel="new post" ref={blogFormRef}>
      <BlogForm
        createPost={addPost}
      />
    </Toggleable>
  )

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('Logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />

      {user === null ?
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
        :
        <div>
          <h3>{user.name} logged-in</h3>
          <button onClick={logoutUser}>Log out</button>
          <h3>Create new blog post</h3>
          {blogForm()}
        </div>
      }
      <h2>All blogs: </h2>
      {blogs.map(blog =>
        <div>
          <p>{blog.title} written by {blog.author}. <a href={blog.url}>Read more</a></p>
        </div>
      )}
    </div>
  )
}

export default App