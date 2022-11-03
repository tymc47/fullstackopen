const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const middleware = require('./utils/middleware')
require('express-async-errors')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app;