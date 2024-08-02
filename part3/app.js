const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const personsRouter = require('./controllers/persons')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('app.js -> connecting to', config.MONGODB_URI, process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        logger.info('app.js-> connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app