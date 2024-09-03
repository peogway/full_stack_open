import { useField, useResource } from './hooks/hook'

const App = () => {
  const { reset: resetContent, ...contentWithoutResetFn } = useField('text')
  const { reset: resetName, ...nameWithoutResetFn } = useField('text')
  const { reset: resetNumber, ...numberWithoutResetFn } = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: contentWithoutResetFn.value })
    resetContent()
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({
      name: nameWithoutResetFn.value,
      number: nameWithoutResetFn.value,
    })
    resetName()
    resetNumber()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...contentWithoutResetFn} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...nameWithoutResetFn} /> <br />
        number <input {...numberWithoutResetFn} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default App

