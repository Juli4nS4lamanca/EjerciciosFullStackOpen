const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')
const { listBlogs, listWithOneBlog } = require('./listBlogs.js')

describe('blog most liked', () => {
  test('favorite blog of a list', () => {
    const result = listHelper.favoriteBlog(listBlogs)
    const prueba = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }
    assert.deepStrictEqual(result, prueba)
  })
  test('favorite blog of a one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const prueba = {
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }
    assert.deepStrictEqual(result, prueba)
  })
})
