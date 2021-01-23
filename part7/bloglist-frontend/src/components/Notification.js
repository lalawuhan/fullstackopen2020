import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.message)

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    background: 'lightgrey'
  }

  return <React.Fragment>{message !== null && <div style={style}>{message}</div>}</React.Fragment>
}

export default Notification