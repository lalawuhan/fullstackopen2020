import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  }
  catch (e) {
    throw new Error(e)
  }
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const update = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, { likes: blog.likes }, getConfig())
  return request.data
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

const comment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, { comment }, getConfig())
  return request.data
}

export default { getAll, create, update, remove, comment }