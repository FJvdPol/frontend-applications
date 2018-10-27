const db = require('./db/index')

module.exports = (server) => {

  server.post('/register', async (req, res) => {
    if (req.body.user) {
      try {
        const user = await db.user.create(req.body.user)
        res.send('user created')
      } catch (err) {
        res.status(400).send({
          error: 'Dit emailadres is al in gebruik'
        })
      }
    } else {
      res.status(400).send({
        error: 'Not enough parameters'
      })
    }

  })

  server.post('/login', async (req, res) => {
    if (req.body.user) {
      try {
        const {email, pass} = req.body.user
        const user = await db.user.findOne({
          where: {
            email: email
          }
        })
        if (!user) {
          return res.status(404).send({
            error: 'Kon geen account vinden met dit emailadres'
          })
        }
        if (user.pass !== pass){
          return res.status(401).send({
            error: 'Onjuist wachtwoord'
          })
        }
        // session user
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } catch (err) {
        res.status(500).send({
          error: 'Er ging iets fout'
        })
      }
    } else {
      res.status(400).send()
    }

  })


}
