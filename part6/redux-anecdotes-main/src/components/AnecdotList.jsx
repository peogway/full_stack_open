import { useDispatch, useSelector } from 'react-redux'
import {
  voteAnecdoteAction,
  initializeAnecdotes,
} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notiReducer'
import { useEffect } from 'react'

const AnecdotList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const filterString = useSelector((state) => state.filter)

  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(filterString.toLowerCase())
    })
  )

  const vote = (anecdote) => {
    dispatch(voteAnecdoteAction(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdotList

