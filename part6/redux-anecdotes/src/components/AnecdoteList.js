import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes > 0 ? anecdote.votes : 0}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes) // component can access notes in the store with this hook

  const vote= (id, anecdote)=> {
    dispatch(addVote(id))
    dispatch(createNotification(`You voted for: ${anecdote.content}`))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <Anecdote key={anecdote.id}
        anecdote={anecdote}
        handleClick={()=> vote(anecdote.id, anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList