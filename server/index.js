const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const port = 8081

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

server.get('/status', (req, res) => {
  res.send({
    message: 'hello'
  })
})


server.listen(process.env.PORT || port)
