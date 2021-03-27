const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const enforce = require('express-sslify')
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const compression = require('compression')

const app = express()
const port = process.env.PORT || 5000;

app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.use(enforce.HTTPS({ trustProtoHeader: true }))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'))
})

app.post('/payment', (req, res) => {
  const stripePayload = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'cad'
  }

  stripe.charges.create(stripePayload, (err, response) => {
    if (err) return res.status(500).send({ error: err })
    res.send({ success: response })
  })
})

app.listen(port, error => {
  if (error) throw error;
  console.log(`Server running on port: ${port}`)
})