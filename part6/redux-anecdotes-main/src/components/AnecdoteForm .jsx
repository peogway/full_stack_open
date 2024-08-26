import { useDispatch } from 'react-redux'
import { createAnecdot } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdot = (event) => {
    event.preventDefault()
    const content = event.target.anecdot.value
    event.target.anecdot.value = ''
    dispatch(createAnecdot(content))
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

