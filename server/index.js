const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const {sequelize} = require('./db')
const env = require('dotenv')

const config = require('./config')
const initRoutes = require('./routes')

env.config()

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(cors())

initRoutes(server)


sequelize.sync()
  .then(() => {
    server.listen(config.port)
    console.log('server running at port: '+ config.port);
  })
