require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env.production'
})

const express = require('express')
const port = 3051
const app = express()

app.use(express.static(__dirname + '/build'))

app.get('*', (req, res) => {
  res.sendFile('./build/index.html', { root: __dirname })
  // res.send('ok')
})

app.listen(port, () => {
  console.log('server listening at', port)
})
