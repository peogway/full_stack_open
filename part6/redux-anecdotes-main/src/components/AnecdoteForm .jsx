import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNoti, removeNoti } from '../reducers/notiReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdot = (event) => {
    event.preventDefault()
    const content = event.target.anecdot.value
    event.target.anecdot.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNoti(`you added '${content}'`))
    setTimeout(() => dispatch(removeNoti()), 5000)
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

