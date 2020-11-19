const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const posts = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(posts.map(post => post.toJSON()))
})

blogRouter.get('/:id', async (request, response) => {
  const post = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1
  })
  if (post) {
    response.json(post)
  }
  else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
blogRouter.post('/', async (request, response) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.json(401).json({ error: 'token missing or invalid' })
  }

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Url or Title is missing' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })
  const savedPost = await blog.save()
  user.posts = user.posts.concat(savedPost._id)
  await user.save()
  response.json(savedPost)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedPost = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  console.log('updatedpost', updatedPost)
  response.json(updatedPost)

})

module.exports = blogRouter
