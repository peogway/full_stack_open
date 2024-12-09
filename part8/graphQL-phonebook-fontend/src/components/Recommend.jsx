import { useState, useEffect } from 'react'
import Select from 'react-select'
import { SET_FAVORITE_GENRE, FAV_GENRE, ALL_BOOKS } from '../queries'
import { useMutation, useQuery } from '@apollo/client'

const Recommend = ({ show, setError }) => {
  const [favGenre, setFavGenre] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [genres, setGenres] = useState([])
  const [setFavorite, res] = useMutation(SET_FAVORITE_GENRE)

  const result = useQuery(FAV_GENRE, {
    pollInterval: 1000,
  })
  const all_books_result = useQuery(ALL_BOOKS, {
    pollInterval: 1000,
  })

  const books_result = useQuery(ALL_BOOKS, {
    variables: { genre: favGenre },
    pollInterval: 1000,
  })
  useEffect(() => {
    if (result.data && result.data.favoriteGenre) {
      setFavGenre(result.data.favoriteGenre.genre)
    }
  }, [result.data])
  if (result.loading || all_books_result.loading || books_result.loading) {
    return <div>loading...</div>
  }
  if (!show) {
    return null
  }

  const books = books_result.data.allBooks
  const allBooks = all_books_result.data.allBooks
  allBooks.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        setGenres(genres.concat(genre))
      }
    })
  })

  const updateFavOption = async () => {
    setFavorite({ variables: { genre: selectedOption.value } })
  }

  const options = genres.map((genre) => ({ value: genre, label: genre }))

  const booksView = () => (
    <div>
      <p>
        books in your favorite genre <strong>{favGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
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
    </div>
  )

  return (
    <div>
      <h2>recommendations</h2>
      {books.length > 0 ? (
        booksView()
      ) : (
        <p>You have not chose favorite genre yet</p>
      )}
      <h3>Choose your favorite genre:</h3>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
      <button onClick={updateFavOption}>confirm</button>
    </div>
  )
}

export default Recommend

