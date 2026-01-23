const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')
const { listBlogs, listWithOneBlog } = require('./listBlogs.js')

describe('author with most blogs', () => {
  test('most blogs', () => {
    const result = listHelper.mostBlogs(listBlogs)
    const prueba = {
      author: "Robert C. Martin",
      blogs: 3
    }
    assert.deepStrictEqual(result, prueba)
  })

  test('list with one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const prueba = {
      author: listWithOneBlog[0].author,
      blogs: 1
    }

    assert.deepStrictEqual(result, prueba)
  })
})
