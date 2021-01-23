import React, { useState, useImperativeHandle } from 'react'
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
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <SmallButton onClick={toggleVisibility}>{props.buttonLabel}</SmallButton>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <SmallButton onClick={toggleVisibility}>cancel</SmallButton>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable