import { useState } from 'react'
import { useCountry, useField } from './hooks/hooks'
import Country from './components/Country'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const [firstFind, setFirstFind] = useState(true)
  const country = useCountry(name)

  const notFoundCountry = { ...country, notFound: false, firstFind }
  if (!country) {
    notFoundCountry.notFound = true
  }

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    setFirstFind(false)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country ? country : notFoundCountry} />
    </div>
  )
}

export default App

