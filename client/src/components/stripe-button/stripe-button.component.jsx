import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'

// styles
import Logo from '../../assets/crown.svg'

const StripeCheckoutButton = ({ price }) => {
  // stripe expects price to be in cents
  const priceForStripe = price * 100
  const stripePublishableKey =
    'pk_test_51IX8ZZK8eTC0dC3Mqzti7ACdf2a81N6v8z6cK22niCZWUElS6qycrRIt4u7OSPqX0RjOYf0j0SKnby0VxHlOiEs700nnFp3N4x'

  // Success callback function for Stripe, to then be handled on backend
  const onToken = async token => {
    const payload = { amount: priceForStripe, token }
    try {
      await axios.post('/payment', payload)
      alert('Payment successful! 👍')
    } catch (err) {
      console.error(err)
      alert(
        'Payment error, make sure to use the specified test credit card below.'
      )
    }
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='Irwin Clothing Co.'
      billingAddress
      shippingAddress
      image={Logo}
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={stripePublishableKey}
    />
  )
}

export default StripeCheckoutButton
