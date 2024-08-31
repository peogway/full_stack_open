import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notiReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdot = async (event) => {
    event.preventDefault()
    const content = event.target.anecdot.value
    event.target.anecdot.value = ''
    dispatch(createNewAnecdote(content))
    dispatch(setNotification(`you added '${content}'`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdot}>
        <div>
          <input name='anecdot' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

