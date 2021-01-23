import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likePost, removePost, addComment } from '../reducers/blogsReducer'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
const Header = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`
const WarningButton = styled.button`
  font-weight: bold;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    background-color: #d87285;
    color: white;
    padding: 6px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  &:hover {
    background: #823241;
  }
`
const Input = styled.input`
  max-width: 50em;
  padding: 12px 20px;
  margin: 8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`
const CommentBlock = styled.div`
  text-align: center;
  margin: 3em 1em;
  background: #f7f7f7;
  padding: 1em;
  border: 10px solid;
  border-image-source: linear-gradient(45deg, rgb(0,143,104), rgb(250,224,66));
  border-image-slice: 1;
`
const ContentBlock = styled.div`
  text-align: center;
  margin: 3em 1em;
  background: #f7f7f7;
  padding: 1em;
  border: 10px solid;
  border-image-source: linear-gradient(45deg, rgb(0,143,104), rgb(250,224,66));
  border-image-slice: 1;
`

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


  return (
    <div style={blogStyle} className='blog'>
      <Header>
        <i>{blog.title}</i> by {blog.author}
      </Header>
      <div>
        <ContentBlock>
          <Link to={blog.url}>{blog.url}</Link>
          <div>Likes {blog.likes}
            <SmallButton onClick={handleLike}>like</SmallButton>
          </div>
          <div>{blog.user.name}</div>
          {own && <WarningButton onClick={handleRemove}>remove</WarningButton>}
        </ContentBlock>
        <CommentBlock>
          <h3>Add a comment</h3>
          <form onSubmit={handleComment(blog.id)}>
            <Input name="comment" type="text" />
            <SmallButton type='submit'>Add comment</SmallButton>
          </form>
        </CommentBlock>
        <ul>
          {blog.comments ? blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          )) : ''}
        </ul>
      </div>
    </div>
  )
}

export default Blog