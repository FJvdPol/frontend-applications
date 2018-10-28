const db = require('./db/index')
const bcrypt = require('bcrypt')

module.exports = (server) => {

  server.post('/register', async (req, res) => {
    if (req.body.user) {
      try {
        const {name, email, pass} = req.body.user
        const hash = await bcrypt.hash(pass, 10)
        const user = await db.user.create({
          name: name,
          email: email,
          pass: hash
        })
        delete user.dataValues.pass
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } catch (err) {
        console.log(err);
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
        const correctPass = await bcrypt.compare(pass, user.pass)
        if (!correctPass){
          return res.status(401).send({
            error: 'Onjuist wachtwoord'
          })
        }
        // session user
        delete user.dataValues.pass
        const userJson = user.toJSON()
        res.send({
          user: userJson
        })
      } catch (err) {
        console.log(err);
        res.status(500).send({
          error: 'Er ging iets fout'
        })
      }
    } else {
      res.status(400).send()
    }

  })


}
