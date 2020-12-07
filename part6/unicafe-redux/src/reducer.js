const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const incrementGoodness = {
        ...state,
        good: state.good + 1,
      }
      return incrementGoodness
    case 'OK':
      const incrementNeutrality = {
        ...state,
        ok: state.ok + 1,
      }
      return incrementNeutrality
    case 'BAD':
      const incrementBad = {
        ...state,
        bad: state.bad + 1,
      }
      return incrementBad
    case 'ZERO':
      const resetAll = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return resetAll
    default: return state
  }

}

export default counterReducer