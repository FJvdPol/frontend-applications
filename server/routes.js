const db = require('./db/index')

module.exports = (server) => {

  server.post('/register', async (req, res) => {
    if (req.body.user) {
      try {
        const user = await db.user.create(req.body.user)
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
        const user = await db.user.findAll({
          where: {
            email: req.body.user.email
          }
        })
        if (user.length > 0){
          res.send(user)
        } else {
          res.status(404).send({
            error: 'Kon geen account vinden met dit emailadres'
          })
        }
      } catch (err) {
        res.status(400).send({
          error: 'Er ging iets fout'
        })
      }
    } else {
      res.status(400).send({
        error: 'Not enough parameters'
      })
    }

  })


}
