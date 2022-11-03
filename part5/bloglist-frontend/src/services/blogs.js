import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (input) => {
  token = `Bearer ${input}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  console.log(token)
  const config = {
    headers: { authorization: token },
  }

  console.log(config)
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const blogService = {
  getAll,
  setToken,
  create
}

export default blogService