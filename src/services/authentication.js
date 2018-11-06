import connector from './axios-connect.js'

export default {
  register(user) {
    return connector().post('/register', user)
  },
  login(user) {
    return connector().post('/login', user)
  }
}
