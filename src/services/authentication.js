import connector from './axios-connect.js'

export default {
  register(info) {
    return connector().post('/register', info)
  },
  login(user) {
    return connector().post('/login', user)
  },
  logout(user) {
    return connector().post('/logout')
  }
}
