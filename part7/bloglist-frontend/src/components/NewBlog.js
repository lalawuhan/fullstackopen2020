import React, { useState } from 'react'
import styled from 'styled-components'

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
const Input = styled.input`
  width: 50em;
  padding: 12px 20px;
  margin: 8px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`
const Formwrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <Formwrapper onSubmit={handleNewBlog}>
        <div>
          author
          <Input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          title
          <Input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          url
          <Input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <SmallButton id="create">create</SmallButton>
      </Formwrapper>
    </div>
  )
}

export default NewBlog