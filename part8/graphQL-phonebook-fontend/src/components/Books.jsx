import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('all')
  const [genres, setGenres] = useState(['all'])
  let result
  if (genre === 'all') {
    result = useQuery(ALL_BOOKS, {
      pollInterval: 500,
    })
  } else {
    result = useQuery(ALL_BOOKS, {
      variables: { genre },
      pollInterval: 500,
    })
  }

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  // const genres = ['all']
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        setGenres(genres.concat(genre))
      }
    })
  })

  // if (genre != 'all') {
  //   books = books.filter((book) => book.genres.includes(genre))
  // }

  return (
    <div>
      <h2>books</h2>
      {genre !== 'all' ? (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      ) : null}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '10px' }}>
        {genres.map((genre) => (
          <div key={genre}>
            <button onClick={() => setGenre(genre)}>{genre}</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Books

