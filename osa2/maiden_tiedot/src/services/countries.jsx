import axios from 'axios'

const baseUrl="https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {
    console.log("Get country info from:",baseUrl) 
    return axios.get(baseUrl) 
}

export default { getAll } 