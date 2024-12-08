import { useQuery, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'
import Select from 'react-select'

const Authors = ({ show, setError }) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [setAuthor, res] = useMutation(SET_BIRTHYEAR)

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 1000,
  })
  useEffect(() => {
    if (res.data && res.data.editAuthor === null) {
      setError('person not found')
    }
  }, [res.data])
  const updateAuthor = () => {
    setAuthor({
      variables: { name: selectedOption.value, setBornTo: parseInt(born) },
    })
    setBorn('')
  }
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors
  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <h2>Set birthyear</h2>
      <div>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
      <div>
        born
        <input
          type='number'
          value={born}
          onChange={({ target }) => setBorn(target.value)}
        />
      </div>
      <div>
        <button type='button' onClick={updateAuthor}>
          update author
        </button>
      </div>
    </div>
  )
}

export default Authors

