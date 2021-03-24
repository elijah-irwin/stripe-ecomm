import React from 'react'
import { useHistory } from 'react-router-dom'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { toggleShowCart } from '../../redux/cart/cart.actions'

// Components
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'

// Styles
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
  let history = useHistory()

  // Redux
  const { cartItems } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const goToCheckoutPage = () => {
    dispatch(toggleShowCart())
    history.push('/checkout')
  }

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {!cartItems.length && (
          <span className='empty-message'>Your cart is empty...</span>
        )}
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <CustomButton onClick={goToCheckoutPage}>Checkout</CustomButton>
    </div>
  )
}

export default CartDropdown
