import axios from 'axios'

const API_KEY = '8f0c93e5e33e7bf97f5759634d0ffb51'
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export const FETCH_WEATHER = 'FETCH_WEATHER'

export let fetchWeather = (city) => {
  const url = `${ROOT_URL}&q=${city},us`
  const request = axios.get(url)

  console.log('request is: ', request)

  return {
    type: FETCH_WEATHER,
    payload: request
  }
} 