import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl)
            .then(response => response.data)
}

const create = (newNumber) => {
    return axios.post(baseUrl, newNumber)
            .then(response => response.data)
}

const deleteNum = (id) => {
    return axios.delete(baseUrl + `/${id}`)
}

const updateNum = (id, newNumber) => {
    return axios.put(baseUrl + `/${id}`, newNumber)
            .then(response => response.data)
}

const numberService = {
    getAll,
    create,
    deleteNum,
    updateNum
}

export default numberService;