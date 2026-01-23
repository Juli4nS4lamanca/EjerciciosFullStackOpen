const _ = require('lodash')

const dummy = blogs => {
  return 1

}

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }

  return blogs.length === 0 ? 0 : likes.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const blogsOrdenados = blogs.sort((a, b) => b.likes - a.likes)
  const favorite = {
    title: blogsOrdenados[0].title,
    author: blogsOrdenados[0].author,
    likes: blogsOrdenados[0].likes
  }
  return favorite
}

const mostBlogs = blogs => {
  const blogsAgrupados = Object.entries(_.groupBy(blogs, 'author'))
  const blogsAgrupadosOrdenados = blogsAgrupados.sort((a, b) => b[1].length - a[1].length)
  const most = {
    author: blogsAgrupadosOrdenados[0][0],
    blogs: blogsAgrupadosOrdenados[0][1].length
  }
  return most

}

const mostLikes = blogs => {
  const blogsAgrupados = Object.entries(_.groupBy(blogs, 'author'))
  const reducer = (sum, item) => {
    return sum + item
  }

  const autoresLikes = blogsAgrupados.map((author) => {
    const likes = author[1].map(blog => blog.likes)
    const nLikes = likes.reduce(reducer, 0)
    const authorLikes = {
      author: author[0],
      likes: nLikes
    }
    return authorLikes
  })

  const mostLikesAuthor = autoresLikes.sort((a, b) => b.likes - a.likes)[0]

  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
