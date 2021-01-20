import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import ConnectedAnecdoteList from './components/AnecdoteList'
import AnecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import ConnectedAnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    AnecdoteService.getAll().then(anecdote => {
      dispatch(initializeAnecdotes(anecdote))
    })
  }, [dispatch])

  return (
    <div>
      <Notification />
      <ConnectedAnecdoteForm />
      <ConnectedAnecdoteList/>
    </div>
  )
}

export default App