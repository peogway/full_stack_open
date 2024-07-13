const { describe, test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('all blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api
    .get('/api/blogs')

  assert.strictEqual('id' in response.body[0], true)
})

test('a new blog post can be created', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Peogway',
    url: 'http://blog.peogway.oncoder.com/peogway/test',
    likes: 2310,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes(newBlog.title))
})


test('likes will default to 0 if missing', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Peogway',
    url: 'http://blog.peogway.oncoder.com/peogway/test'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const likesOfCreatedBlog = blogsAtEnd[blogsAtEnd.length-1].likes

  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes(newBlog.title))

  assert.strictEqual(likesOfCreatedBlog,0)
})

describe('create new blog missing', () => {
  test('title returns status code 400 Bad Request', async () => {
    const newBlog = {
      author: 'Peogway',
      url: 'http://blog.peogway.oncoder.com/peogway/test',
      likes: 2310,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })


  test('url returns status code 400 Bad Request', async () => {
    const newBlog = {
      title: 'Test blog',
      author: 'Peogway',
      likes: 2310,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })


  test('both title and url returns status code 400 Bad Request', async () => {
    const newBlog = {
      author: 'Peogway',
      likes: 2310,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map(blog => blog.title)

  assert(!titles.includes(blogToDelete.title))
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updateBlog = {
    likes : 2403
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updateBlog)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd[0].likes, updateBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})