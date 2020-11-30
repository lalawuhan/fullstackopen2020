import React, { useState } from 'react'

const BlogForm = ({ createPost }) => {
  const [newPost, setNewPost] = useState({
    title: '',
    author: '',
    url: ''
  })

  const handlePostChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  }

  const addPost = (e) => {
    e.preventDefault()
    createPost({
      title: newPost.title,
      author: newPost.author,
      url: newPost.url,
    })
    setNewPost('')
  }

  return (
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
}
export default BlogForm
