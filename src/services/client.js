import crypt from './encoding.js'

export default {
  create(client) {
    const clients = JSON.parse(sessionStorage.getItem('clients'))
    client = {...client, lastname: crypt.encode(client.lastname)}
    if (!clients) {
      client.id = 0
      sessionStorage.setItem('clients', JSON.stringify([client]))
    } else {
      client.id = clients.length
      clients.push(client)
      sessionStorage.setItem('clients', JSON.stringify(clients))
    }
    return {
      status: 200,
      data: {
        client
      }
    }
  },

  getAll() {
    const encClients = JSON.parse(sessionStorage.getItem('clients'))
    if (!encClients) {
      return {
        status: 404,
        error: 'No clients found'
      }
    }
    const clients = encClients.map(client => ({...client, lastname: crypt.decode(client.lastname)}))
    return {
      status: 200,
      data: {
        clients
      }
    }
  },

  get(id) {
    const clients = JSON.parse(sessionStorage.getItem('clients'))
    if (!clients || !clients[id]) {
      return {
        status: 404,
        error: 'Client was not found'
      }
    }
    const client = {...clients[id], lastname: crypt.decode(clients[id].lastname)}
    return {
      status: 200,
      data: {
        client
      }
    }
  },

  update(id, client) {
    const clients = JSON.parse(sessionStorage.getItem('clients'))
    if (!clients || !clients[id]) {
      return {
        status: 404,
        error: 'Client was not found'
      }
    }
    client = {...client, lastname: crypt.encode(client.lastname)}
    clients[id] = client
    sessionStorage.setItem('clients', JSON.stringify(clients))
    return {
      status: 200,
      data: {
        client
      }
    }
  }
}
