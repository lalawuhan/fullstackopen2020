const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return Object.assign({}, state, {good: +1});
    case 'OK':
      return state
    case 'BAD':
      return state -1
    case 'ZERO':
      return state
    default: return state
  }

}

export default counterReducer