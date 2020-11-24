import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newPost, setNewPost] = useState({
    title:'',
    author:'',
    url:''
  })
  // const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      console.log('blogs', blogs.map((blog)=> blog.title))
      setBlogs(blogs)
    }

    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addPost = (e) => {
    e.preventDefault()
    const blogObject = {
      title: newPost.title,
      author: newPost.author,
      url: newPost.url,
      user: user._id
    }

    blogService
      .create(blogObject)
      .then(returnedPost => {
        setErrorMessage('Success, blog post added')
        setBlogs(blogs.concat(returnedPost))
        setNewPost('')
      })
  }

  const handlePostChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
    }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addPost}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handlePostChange}
        />
      </label>
      <label>
        Author
        <input
          type="text"
          name="author"
          value={newPost.author}
          onChange={handlePostChange}
        />
      </label>
      <label>
        Url
        <input
          type="url"
          name="url"
          value={newPost.url}
          onChange={handlePostChange}
        />
      </label>
      <button type="submit">save</button>
    </form>
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