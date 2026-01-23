const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    // Se hacen dos peticiones a la base datos, funcional pero pude ser costoso
    // const userID = request.userId
    // const blog = await Blog.findById(request.params.id)
    //
    // if (!blog) {
    //   return response.status(404).json({ error: 'blog not found' })
    // }
    //
    // if (blog.user.toString() !== userID) {
    //   return response.status(401).json({ error: 'user not authorized' })
    // }
    //
    // await Blog.findByIdAndDelete(request.params.id)

    const result = await Blog.findOneAndDelete({ _id: request.params.id, user: request.userId })
    if (!result) {
      return response.status(404).json({ error: 'Blog not found or user not authorized' })
    }
    response.status(204).end()
  }
  catch (exception) {
    next(exception)
  }

})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body
  const user = await User.findById(request.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const updateBlog = await Blog.findOneAndUpdate(
      { _id: request.params.id, user: request.userId },
      { $inc: { likes: 1 } },
      { new: true })
    if (!updateBlog) {
      return response.status(404).json({ error: 'Blog not found or user not authorized' })
    }
    response.json(updateBlog)
  } catch (exception) {
    next(exception)
  }

})

module.exports = blogsRouter
