const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SHOW_NOTIFICATION': {
    return action.data.message
  }
  case 'HIDE_NOTIFICATION': {
    return null
  }
  default: return state
  }
}

let timeoutID

export const showNotification = (message) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        message
      }
    })
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION'
      })
    }, 5000)
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  }
}

export default reducer
