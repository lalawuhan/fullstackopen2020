const Blog = require('../models/blog')
const User = require('../models/user')

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
const usersInDB = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, nonExistingId, postsInDB, usersInDB
}
