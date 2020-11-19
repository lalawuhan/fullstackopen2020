const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Hello',
    author: 'Maximillian',
    url: 'facebook.com',
    likes: 24
  },
  {
    title: 'Goodbye',
    author: 'Samuel',
    url: 'google.com',
    likes: 4
  },
]

const nonExistingId = async () => {
  const post = new Blog({
    title: 'TestingTitle',
    author: 'TestingAuthor',
    url: 'testurl.com',
    likes: 2
  })
  await post.save()
  await post.remove()

  return post._id.toString()
}

const postsInDB = async () => {
  const posts = await Blog.find({})
  return posts.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, postsInDB
}
