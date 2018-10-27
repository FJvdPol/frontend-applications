const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')

const config = require('./config')
const initRoutes = require('./routes')

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(cors())

initRoutes(server)




server.listen(config.port)
