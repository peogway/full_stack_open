import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY


const getWeatherInfo = (country) => {
    const baseUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`
    return axios.get(baseUrl).then(response => {
                                const data = response.data
                                return {...data, name: country.capital[0]}
                             })
}


export default {getWeatherInfo}