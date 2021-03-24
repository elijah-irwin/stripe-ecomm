// Utils
import { addItemToCart, clearItemFromCart } from './cart.utils'

const INITIAL_STATE = {
  show: false,
  cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_CART':
      return {
        ...state,
        show: !state.show
      }

    case 'ADD_ITEM':
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
      }

    case 'CLEAR_ITEM':
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, action.payload)
      }

    default:
      return state
  }
}

export default cartReducer