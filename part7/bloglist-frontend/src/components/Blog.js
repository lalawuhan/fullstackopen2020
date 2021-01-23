import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likePost, removePost, addComment } from '../reducers/blogsReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector(state => state.posts.find(b => b.id === id))
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  if (!blog) {
    return null
  }

  const own = user && user.username === blog.user.username


  const handleLike = () => {
    dispatch(likePost(blog))
  }

  const handleRemove = () => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(removePost(id))
    }
  }

  const handleComment = (blog) => event => {
    event.preventDefault()
    const content = event.target.comment.value
    console.log('cotent', content)
    dispatch(addComment(id, content))
    event.target.comment.value = ''
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('indivi', blog.id)
  console.log('bloglikes', blog.likes)

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <i>{blog.title}</i> by {blog.author}
      </div>
      <div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {own && <button onClick={handleRemove}>remove</button>}
        <form onSubmit={handleComment(blog.id)}>
          <input name="comment" type="text" />
          <button type='submit'>Add comment</button>
        </form>
        <ul>
          {blog.comments ? blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          )) : ''}
        </ul>
      </div>
    </div>
  )
}

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//   }).isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleRemove: PropTypes.func.isRequired,
//   own: PropTypes.bool.isRequired
// }

export default Blog