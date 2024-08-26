import AnecdoteForm from './components/AnecdoteForm '
import AnecdotList from './components/AnecdotList'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotList />
      <AnecdoteForm />
    </div>
  )
}

export default App

