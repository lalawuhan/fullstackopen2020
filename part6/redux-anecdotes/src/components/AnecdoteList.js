import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { createNotification, hideNotification} from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
  console.log('props',props)
  const anecdotes = props.anecdotes
  const vote= (id, anecdote)=> {
    props.addVote(id)
    props.createNotification(`You voted for: ${anecdote.content}`)
    setTimeout(() => {
      props.hideNotification()
  }, 5000)
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

const mapStateToProps = state => {
  return {
    anecdotes:state.anecdotes
  }
}
const mapDispatchToProps = {
  addVote,
  createNotification,
  hideNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
