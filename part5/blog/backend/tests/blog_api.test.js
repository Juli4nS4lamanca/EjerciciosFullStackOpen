const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./listBlogs.js')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

let token = null
let userId = null

beforeEach(async () => {
  await Blog.deleteMany({})

  // Promesas ejecutadas en paralelo
  const blogObjects = helper.listBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  const user = {
    username: "Atem99",
    password: "Secret"
  }

  const userLog = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  token = userLog.body.token
  })

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.listBlogs.length)
})

test('revisar que existe el parametro id', async () => {
  const response = await api.get('/api/blogs')
  const blog1 = response.body[0]
  const claves = Object.keys(blog1)
  assert(claves.includes('id'))
})

describe('api post', () => {

  test('response 201 if data is ok', async () => {
    const blog = {
      title: "Intento POST",
      author: "Julian Salamanca",
      url: "www.Intento.com",
      likes: 1,
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.listBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes(blog.title))
  })

  test('likes 0 when doesnt includes likes', async () => {
    const blog = {
      title: "Intento POST",
      author: "Julian Salamanca",
      url: "www.Intento.com",
    }
    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const blogPrueba = blogsAtEnd[blogsAtEnd.length - 1]
    assert.strictEqual(blogPrueba.likes, 0)
  })

  test('bad request title and/or url', async () => {
    const blog = {
      author: "Julian Salamanca",
      url: "www.Intento.com",
    }

    await api.post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.listBlogs.length)
  })

  test('user not authorized', async () => {
    const blog = {
      title: "Intento POST",
      author: "Julian Salamanca",
      url: "www.Intento.com",
    }

    await api.post('/api/blogs')
      .send(blog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.listBlogs.length)
  })
})

describe('delete a blog', () => {
  test('response 204 when data is ok', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)
    assert(!titles.includes(blogDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.listBlogs.length - 1)
  })

  test('response 401 when user isnot authorized', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes(blogDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.listBlogs.length)
  })

})

describe('update a blog', () => {
  test('update data is ok', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[1]

    await api.put(`/api/blogs/${blog.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    const blogsUpdate = await helper.blogsInDb()
    const blogUpdate = blogsUpdate.find(b => blog.id === b.id)

    assert.strictEqual(blogUpdate.likes, blog.likes + 1)

  })

  test('update a blog doesnt exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    await api.put(`/api/blogs/${validNonExistingId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)

  })

  test('update 401 when user isnot authorized', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[1]

    await api.put(`/api/blogs/${blog.id}`)
      .expect(401)

    const blogsUpdate = await helper.blogsInDb()
    const blogUpdate = blogsUpdate.find(b => blog.id === b.id)

    assert.strictEqual(blogUpdate.likes, blog.likes)

  })
})

after(async () => {
  await mongoose.connection.close()
})
