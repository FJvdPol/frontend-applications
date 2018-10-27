import connector from './axios-connect.js'

export default {
  register(info) {
    return (
      connector().post('/register', info)
        .then(res => this.response = res)
        .catch(err => this.response = err.response)
      )
  },
  login(user) {
    return (
      connector().post('/login', user)
        .then(res => this.response = res)
        .catch(err => this.response = err.response)
      )
  }
}
