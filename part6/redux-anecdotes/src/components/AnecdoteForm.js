import React from 'react'
import { useDispatch } from 'react-redux'
import { createPost } from '../reducers/anecdoteReducer'
import { createNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch() // provides any React component access to the dispatch funtion of the redux store in index.js

  const addPost = (event) => {
    event.preventDefault()
    const content = event.target.post.value
    event.target.post.value = ''
    dispatch(createPost(content))
    dispatch(createNotification(`New anecdote: ${content}`))
    setTimeout(() => dispatch(hideNotification()), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addPost}>
        <div><input name="post" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
