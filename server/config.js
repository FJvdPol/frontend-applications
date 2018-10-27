module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DBNAME || 'frontendapplications',
    user: process.env.DBUSER || 'frontend',
    password: process.env.DBPASS || 'applications',
    options: {
      dialect: process.env.DBLANG || 'sqlite',
      host: process.env.DBHOST || 'localhost',
      storage: process.env.DBSTORE || './frontendapplications.sqlite'
    }
  }
}
