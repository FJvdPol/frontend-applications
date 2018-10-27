import connector from './axios-connect.js'

export default {
  register(info) {
    return connector().post('/register', info)
  }
}
