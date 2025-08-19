const config = require('./utils/config.js')
const { info, error } = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


mongoose.set('strictQuery', false)

info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch(error => {
    error('error connecting to MongoDB', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
