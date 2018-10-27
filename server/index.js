const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')

const port = 8081

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use(cors())

server.post('/register', (req, res) => {
  console.log(req.body.name, req.body.pass);
})


server.listen(port)
