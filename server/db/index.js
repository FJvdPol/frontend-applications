const Sequelize = require('sequelize')
const config = require('../config')

const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

db.user = sequelize.import('./models/User.js')
db.client = sequelize.import('./models/Client.js')

db.sequelize = sequelize

module.exports = db
