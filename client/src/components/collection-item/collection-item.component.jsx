import React from 'react'

// Redux
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../../redux/cart/cart.actions'

// Components
import CustomButton from '../custom-button/custom-button.component'

// Styles
import './collection-item.styles.scss'

const CollectionItem = ({ item }) => {
  // item props
  const { name, price, imageUrl } = item

  // Redux
  const dispatch = useDispatch()

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <CustomButton
        className='custom-button'
        inverted
        onClick={() => dispatch(addItemToCart(item))}
      >
        Add To Cart
      </CustomButton>
    </div>
  )
}

export default CollectionItem
