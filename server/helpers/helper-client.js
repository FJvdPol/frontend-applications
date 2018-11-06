const db = require('../db/index')
const bcrypt = require('bcrypt')

module.exports = {
  async create(req, res) {
    if (req.body.client) {
      try {
        const {name, lastname, img, risk, formdata} = req.body.client
        // const hash = await bcrypt.hash(pass, 10)
        const client = await db.client.create({
          name,
          lastname,
          img,
          risk,
          formdata
        })
        const clientJson = client.toJSON()
        res.send({
          client: clientJson
        })
      } catch (err) {
        res.status(500).send({
          error: 'Cliënt kon niet worden aangemaakt'
        })
      }
    } else {
      res.status(400).send({
        error: 'Not enough parameters'
      })
    }

  },

  async getAll(req, res) {
    try {
      const clients = await db.client.findAll()
      if (clients.length == 0) {
        return res.status(404).send({
          error: 'Er zijn nog geen cliënten'
        })
      }
      res.send({
        clients: clients
      })
    } catch (err) {
      res.status(500).send({
        error: 'Er ging iets fout'
      })
    }
  },

  async get(req, res) {
    if (req.params.id) {
      try {
        const client = await db.client.findByPk(req.params.id)
        console.log('sending client: ', client.id)
        if (!client) {
          return res.status(404).send({
            error: 'Er is geen cliënt met dit id'
          })
        }
        res.send({
          client
        })
      } catch (err) {
        res.status(500).send({
          error: 'Er ging iets fout'
        })
      }
    } else {
      res.status(400).send()
    }
  },

  async update(req, res) {
    if (req.params.id) {
      try {
        const {name, lastname, img, risk, formdata} = req.body.client
        const client = await db.client.update({
            name,
            lastname,
            img,
            risk,
            formdata
          },
          {
            where: { id: req.params.id }
          }
        )
        if (!client) {
          return res.status(404).send({
            error: 'Er is geen cliënt met dit id'
          })
        }
        res.send({
          client
        })
      } catch (e) {
        console.log(e);
        res.status(500).send({
          error: 'Er ging iets fout'
        })
      }
    } else {
      res.status(400).send()
    }
  }
}
