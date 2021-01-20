import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
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
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App