const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const helper = require('./listBlogs.js')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('test api users', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ name: 'Atem', username: 'root', passwordHash })

    await user.save()
  })

  test('create a new user, data ok', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Atem99',
      name: 'Julian Salamanca',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('create a new user without username', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'At',
      name: 'Julian Salamanca',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(!usernames.includes(newUser.username))
  })

  test('create a new user password minlength < 3', async () => {

    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Atem',
      name: 'Julian Salamanca',
      password: 'se'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    assert(!usernames.includes(newUser.username))
  })

})

after(async () => {
  await mongoose.connection.close()
})
