import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'NEW_POST':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const postToChange = state.find(n => n.id === id)
      const changedPost = {
        ...postToChange,
        votes: postToChange.votes +1
      }
      return state.map(post => post.id !== id ? post : changedPost)
    case 'INIT_ANECDOTES':
      return action.data
      default:
        return state
    }
}

export const createPost = (anecdote) => {
  return async dispatch => {
    const newPost = await anecdoteService.createPost(anecdote)
    dispatch ({
    type: 'NEW_POST',
    data: newPost
  })
}
}

export const addVote = (id) => {
  return async dispatch => {
    const addVote = await anecdoteService.addVote(id)
    dispatch({
    type: 'VOTE',
    data: addVote
  })
}
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  })
}
}

export default anecdoteReducer