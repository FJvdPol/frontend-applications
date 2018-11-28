import crypt from './encoding.js'

export default {
  register(user) {
    user = {...user, pass: crypt.encode(user.pass)}
    const users = JSON.parse(sessionStorage.getItem('users'))
    if (!users) {
      sessionStorage.setItem('users', JSON.stringify([user]))
    } else {
      if (users.some(acc => acc.email === user.email)) return {
          status: 400,
          error: 'This emailadress is already in use.'
        }
      users.push(user)
      sessionStorage.setItem('users', JSON.stringify(users))
    }
    delete user.pass
    sessionStorage.setItem('user', JSON.stringify(user))
    return {
      status: 200,
      data: {
        user
      }
    }
  },
  login(user) {
    const {email, pass} = user
    const users = JSON.parse(sessionStorage.getItem('users'))
    if (!users || !users.some(acc => acc.email === email)) return {
        status: 404,
        error: 'Kon geen account vinden met dit emailadres'
      }
    const account = users.find(acc => acc.email === email)
    if (pass !== crypt.decode(account.pass)) return {
        status: 401,
        error: 'Email en/of wachtwoord zijn niet juist.'
      }
    delete account.pass
    sessionStorage.setItem('user', JSON.stringify(account))
    return {
      status: 200,
      data: {
        account
      }
    }

  }
}
