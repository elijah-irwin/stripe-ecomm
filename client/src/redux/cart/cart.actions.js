export const toggleShowCart = () => ({
  type: 'TOGGLE_SHOW_CART'
})

export const addItemToCart = item => ({
  type: 'ADD_ITEM',
  payload: item
})

export const removeItemFromCart = item => ({
  type: 'REMOVE_ITEM',
  payload: item
})

export const clearItemFromCart = item => ({
  type: 'CLEAR_ITEM',
  payload: item
})