import bodyParser from 'body-parser'
import cors from 'cors'
import errorHandler from 'errorhandler'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import config from './config'

const app = express()

app.use(cors())
app.use(require('morgan')(config.IS_PODUCTION ? 'tiny' : 'dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose
  .connect('mongodb://localhost:27017/chatts', {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err))
require('./utils/passport')

//router
app.use('/api/dialog', routes.dialog)
app.use('/api/message', routes.message)
app.use('/api/user', routes.user)

app.use(errorHandler())

app.listen(config.PORT, () =>
  console.log(`Server listen on port ${config.PORT}! `)
)
