import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdot } from '../reducers/anecdoteReducer'

const AnecdotList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()
  const vote = (id) => {
    dispatch(voteAnecdot(id))
  }
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdotList

