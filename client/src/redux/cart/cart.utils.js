export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem =>
    cartItem.id === cartItemToAdd.id
  )

  if (existingCartItem) {
    return cartItems.map(item =>
      item.id === cartItemToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToClear.id)

  if (existingCartItem.quantity === 1) {
    return cartItems
  }

  return cartItems.map(cartItem => cartItem.id === cartItemToClear.id
    ? { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
  )
}