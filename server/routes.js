const user = require('./helpers/helper-user')
const client = require('./helpers/helper-client')

module.exports = (server) => {
  server.post('/register', user.register),
  server.post('/login', user.login),

  server.post('/clients', client.create),
  server.post('/clients/:id', client.update),
  server.get('/clients', client.getAll),
  server.get('/clients/:id', client.get)
}
