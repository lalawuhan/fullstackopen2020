const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const posts = await Blog.find({})
  response.json(posts)
})

blogRouter.get('/:id', async (request, response) => {
  const post = await Blog.findById(request.params.id)
  if (post) {
    response.json(post)
  }
  else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  const savedPost = await blog.save()
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
