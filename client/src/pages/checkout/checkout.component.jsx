import React, { useMemo } from 'react'

// Components
import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'

// Redux
import { useSelector } from 'react-redux'

// Styles
import './checkout.styles.scss'

const CheckoutPage = () => {
  const { cartItems } = useSelector(state => state.cart)

  // only re-renders if cartItems changes
  // see react hooks useMemo docs for more info
  const itemsTotalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }, [cartItems])

  return (
    <div className='checkout-page'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems &&
        cartItems.map(item => <CheckoutItem key={item.id} item={item} />)}
      <div className='total'>
        <span>TOTAL: ${itemsTotalPrice}</span>
      </div>
      <div className='test-warning'>
        Please use the following test credit card info to test the payment flow.
        <br />
        Card #: 4242 4242 4242 4242 - Exp: 01/25 - CVC: 123
      </div>
      <StripeCheckoutButton price={itemsTotalPrice} />
    </div>
  )
}

export default CheckoutPage
