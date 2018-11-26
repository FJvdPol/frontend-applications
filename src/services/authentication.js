import crypt from './encoding.js'

export default {
  register(user) {
    return new Promise(async (resolve, reject) => {
      user = {...user, pass: crypt.encode(user.pass)}
      try {
        const users = JSON.parse(sessionStorage.getItem('users'))
        if (users) {
          if (users.some(acc => acc.email === user.email)) {
            reject({
              status: 400,
              error: 'This emailadress is already in use.'
            })
          }
          users.push(user)
          sessionStorage.setItem('users', JSON.stringify(users))
        } else {
          sessionStorage.setItem('users', JSON.stringify([user]))
        }
        delete user.pass
        sessionStorage.setItem('user', JSON.stringify(user))
        resolve({
          status: 200,
          data: {
            user
          }
        })
      } catch(e) {
        reject(e)
      }
    })
  },
  async login(user) {
    return new Promise(async (resolve, reject) => {
      const {email, pass} = user
      const users = await JSON.parse(sessionStorage.getItem('users'))
      if (!users || !users.some(acc => acc.email === email)) {
        return reject({
          status: 404,
          error: 'Kon geen account vinden met dit emailadres'
        })
      }
      const account = users.find(acc => acc.email === email)
      if (pass !== crypt.decode(account.pass)) {
        return reject({
          status: 401,
          error: 'Email en/of wachtwoord zijn niet juist.'
        })
      }
      delete account.pass
      sessionStorage.setItem('user', JSON.stringify(account))
      resolve({
        status: 200,
        data: {
          account
        }
      })
    })

  }
}
