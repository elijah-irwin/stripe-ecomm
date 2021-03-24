import React, { useMemo } from 'react'

// Redux
import { useSelector } from 'react-redux'

// Styles
import './cart-icon.styles.scss'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

const CartIcon = ({ onClick }) => {
  const { cartItems } = useSelector(state => state.cart)

  // only rerenders if cartItems changes
  // see react hooks useMemo docs for more info
  const memoedCartItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }, [cartItems])

  return (
    <div className='cart-icon' onClick={onClick}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{memoedCartItems}</span>
    </div>
  )
}

export default CartIcon
