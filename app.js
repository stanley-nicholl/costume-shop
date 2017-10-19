const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

app.disable('powered-by-x')
app.use(morgan('dev'))
app.use(bodyParser.json())

const costumes = require('./routes/costumes.routes')
app.use('/costumes', costumes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({error: err})
})

app.use((req, res, next) => {
  res.status(404).json({error: {message: 'Not found'}})
})

const listener = () => console.log(`Listening on ${port}`);
app.listen(port, listener)

module.exports = app
