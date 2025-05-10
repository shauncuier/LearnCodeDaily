const express = require('express')
const cors = require('cors')
// const morgan = require('morgan')
const app = express()
const port = 3000;

app.use(cors())

app.get('/', (req, res) => {
  res.send('My First Express App!')
})
app.get('/blog', (req, res) => {
  res.send('My First Express Blog!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})