const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')
const { listBlogs, listWithOneBlog } = require('./listBlogs.js')

describe('author with most likes', () => {
  test('most likes of a list', () => {
    const result = listHelper.mostLikes(listBlogs)
    const prueba = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    assert.deepStrictEqual(result, prueba)
  })
  test('most likes of a list with one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const prueba = {
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }

    assert.deepStrictEqual(result, prueba)
  })
})
