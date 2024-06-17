import { useState, useEffect} from 'react'
import countriesServices from './services/countries'
import Countries from './components/Countries'
import Country from './components/Country'
import weatherServices from './services/weather'
import Weather from './components/Weather'

function App() {
  const [filterCountry, setFilterCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [matchCountries, setMatchCountries] = useState([])
  const [message, setMessage] = useState('too many matches, specify another filter')
  const [firstRender, setFirstRender] = useState(true)
  const [displayCountry, setDisplayCountry] = useState(null)
  const [weather, setWeather] = useState()
  const [buttonController, setButtonController] = useState(false)


  useEffect(() => {
    countriesServices.getAll().then(allCountries => setCountries(allCountries))
  }, [])
  
  const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().startsWith(filterCountry.toLowerCase()))
  

  useEffect(() => {

    if (firstRender){
      setFirstRender(false)
      return
    }
    if (countriesToShow.length>10) {
      setMessage('too many matches, specify another filter')
      setMatchCountries([])
      setDisplayCountry(null)
      setWeather(null)
    }else if (countriesToShow.length===1){
      setMessage('')
      setMatchCountries([])
      setDisplayCountry(countriesToShow[0])
    }
    else {
      setMessage('')
      setWeather(null)
      setMatchCountries(countriesToShow)

      if (!buttonController) {
        setDisplayCountry(null)
      }
      setButtonController(false)
    }
  },[filterCountry])

  useEffect(() => {
    if (displayCountry) {
      weatherServices.getWeatherInfo(displayCountry).then(returnedWeather => setWeather(returnedWeather))
    }
  }, [displayCountry])



  const handleInputChange = (event)=> { 
    setFilterCountry(event.target.value)
  }

  const showInfor = (country) => {
    setDisplayCountry(country)
    setFilterCountry(country.name.common)
    setButtonController(true)
  }


  return (
    <div className = 'container'>
      find countries <input value = {filterCountry} onChange= {handleInputChange}/>
      <br/>
      {message}
      <Countries countries = {matchCountries} showInfor = {showInfor}/>
      <Country country = {displayCountry} />
      <Weather weather = {weather} />
    </div>
  )
}

export default App
