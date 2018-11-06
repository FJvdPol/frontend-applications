import connector from './axios-connect.js'

export default {
  create(client) {
    return connector().post('/clients', client)
  },
  getAll() {
    return connector().get('/clients')
  },
  get(clientId) {
    return connector().get('/clients/' + clientId)
  },
  update(clientId, client) {
    return connector().post('/clients/' + clientId, client)
  }
}
