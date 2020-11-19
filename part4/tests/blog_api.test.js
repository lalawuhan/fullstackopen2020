const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObjects = helper.initialBlogs.map(post => new Blog(post))
  const promiseArray = blogObjects.map(posts => posts.save())
  await Promise.all(promiseArray)
})

describe('when there is initially some blog posts saved', () => {
  test('all posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all posts to be returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('the first post is about something specific', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'Goodbye'
    )
  })
})

describe('viewing a specific note', () => {
  test('a specific post can be viewed', async () => {
    const postsAtStart = await helper.postsInDB()

    const postToView = postsAtStart[0]

    const resultPost = await api
      .get(`/api/blogs/${postToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedPostToView = JSON.parse(JSON.stringify(postToView))

    expect(resultPost.body).toEqual(processedPostToView)
  })

  test('fails with statuscode 404 if post does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    console.log(validNonexistingId)

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(404)
  })

})

describe('addition of a new note', () => {
  test('a valid blog post can be added', async () => {
    const newPost = {
      title: 'Bonang',
      author: 'same.com',
      url: 'Yu Ion',
      likes: 21
    }

    await api
      .post('/api/blogs')
      .send(newPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const posts = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(posts).toContain('Bonang')
  })

  test('blog without title or url is not added', async () => {
    const newPost = {
      author: 'New author',
      likes: 21
    }

    await api
      .post('/api.blogs')
      .send(newPost)
      .expect(404)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)

  })
})



describe('deletion of a note', () => {
  test('a post can be deleted', async () => {
    const postsAtStart = await helper.postsInDB()
    const postToDelete = postsAtStart[0]

    await api
      .delete(`/api/blogs/${postToDelete.id}`)
      .expect(204)

    const postsAtEnd = await helper.postsInDB()

    expect(postsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const posts = postsAtEnd.map(r => r.title)

    expect(posts).not.toContain(postToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})