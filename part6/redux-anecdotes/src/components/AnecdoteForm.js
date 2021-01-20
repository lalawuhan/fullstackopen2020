import React from 'react'
import { connect } from 'react-redux'
import { createPost } from '../reducers/anecdoteReducer'
import { createNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addPost = (event) => {
    event.preventDefault()
    const content = event.target.post.value
    event.target.post.value = ''
    props.createPost(content)
    props.createNotification(`New anecdote: ${content}`)
    setTimeout(() => {props.hideNotification()}, 5000)
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

const mapDispatchToProps = {
  createPost,
  createNotification,
  hideNotification
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm
