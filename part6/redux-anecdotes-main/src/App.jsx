import AnecdoteForm from './components/AnecdoteForm '
import AnecdotList from './components/AnecdotList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'

import { filter } from './reducers/filterReducer'

const App = () => {
  const dispatch = useDispatch()
  const handleFilter = (event) => {
    dispatch(filter(event.target.value))
  }

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      filter: <input onChange={handleFilter} />
      <AnecdotList />
      <AnecdoteForm />
    </div>
  )
}

export default App

