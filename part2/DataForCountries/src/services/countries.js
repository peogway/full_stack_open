import axios from 'axios'

const getAll = () => axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => response.data)


export default {getAll}