import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const post = (newEntry) => {
    return axios.post(baseUrl, newEntry)
}

const update = (id, entry) => {
    return axios.put(`${baseUrl}/${id}`, entry)
}

const erase = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, post, update, erase }