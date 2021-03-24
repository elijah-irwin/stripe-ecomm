const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()
const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

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