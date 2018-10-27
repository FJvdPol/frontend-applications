const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const env = require('dotenv')
const helmet = require('helmet')
const session = require('express-session')

const {sequelize} = require('./db')


const config = require('./config')
const initRoutes = require('./routes')

env.config()

const server = express()
const day = 24 * 360 * 1000
server.use(helmet())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(cors())
server.use(session({
  secret: process.env.SECRET || 'sessionsecret',
  cookie: {
    maxAge: day
  }
}))

initRoutes(server)

sequelize.sync({force: true})
  .then(() => {
    server.listen(config.port)
    console.log('server running at port: '+ config.port);
  })
