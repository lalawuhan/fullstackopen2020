import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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
const AnecdoteList = ({ post, handleClick }) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state) // component can access notes in the store with this hook

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <Anecdote key={anecdote.id}
        anecdote={anecdote}
        handleClick={()=>dispatch(addVote(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList