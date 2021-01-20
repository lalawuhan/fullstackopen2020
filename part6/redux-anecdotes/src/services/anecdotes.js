import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('get all response:', response)
  return response.data
}

const createPost = async (data) => {
  const object = { data, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (id) => {
  const { data: post } = await axios.get(`${baseUrl}/${id}`)
  const response = await axios.patch(`${baseUrl}/${id}`, {
    votes: post.votes + 1,
  })
  return response.data
}


export default { getAll, createPost, addVote }
