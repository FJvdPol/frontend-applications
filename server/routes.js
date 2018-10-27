module.exports = (server) => {

  server.post('/register', (req, res) => {
    res.send('New user registration: \n'+ req.body.name + '\nWith password: \n'+ req.body.pass);
  })
  
}
