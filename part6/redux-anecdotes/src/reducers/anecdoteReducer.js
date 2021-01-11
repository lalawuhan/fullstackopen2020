const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))
//Functions that create actions are called action creators.
export const createPost = (content) => {
  return {
    type: 'NEW_POST',
    data: {
      content,
      votes:0,
      id: generateId()
    }
  }
}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
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
      default:
        return state
    }
}

export default anecdoteReducer