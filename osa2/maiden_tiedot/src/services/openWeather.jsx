import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall'

const getWeather = (lat,lon) => {
    const query = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}`
    console.log("Weather query:",query)
    return axios.get(query)
}

export default { getWeather }