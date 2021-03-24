import React from 'react'

// Redux
import { useDispatch } from 'react-redux'
import {
  removeItemFromCart,
  clearItemFromCart,
  addItemToCart,
} from '../../redux/cart/cart.actions'

import './checkout-item.styles.scss'

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item
  const dispatch = useDispatch()

  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>

      <span className='name'>{name}</span>

      <span className='quantity'>
        <div
          className='arrow'
          onClick={() => dispatch(clearItemFromCart(item))}
        >
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => dispatch(addItemToCart(item))}>
          &#10095;
        </div>
      </span>

      <span className='price'>${price}</span>

      <div
        className='remove-button'
        onClick={() => dispatch(removeItemFromCart(item))}
      >
        &#10005;
      </div>
    </div>
  )
}

export default CheckoutItem
