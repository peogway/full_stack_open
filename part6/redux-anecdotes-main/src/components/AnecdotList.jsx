import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNoti, removeNoti } from '../reducers/notiReducer'

const AnecdotList = () => {
  const filterString = useSelector((state) => state.filter)

  const anecdotes = useSelector((state) =>
    state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filterString.toLowerCase())
    )
  )

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNoti(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(removeNoti()), 5000)
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

