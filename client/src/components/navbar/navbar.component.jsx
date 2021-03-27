import React from 'react'

// Components
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

// Utils
import { auth } from '../../firebase/firebase.utils'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { toggleShowCart } from '../../redux/cart/cart.actions'

// Styles
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
  OptionDiv,
} from './navbar.styles'
import { ReactComponent as Logo } from '../../assets/crown.svg'

/**
 * NavBar Component
 */
const NavBar = () => {
  // Get user state from redux
  const { currentUser } = useSelector(state => state.user)
  const { show } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <Logo className='logo' />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to='/shop'>SHOP</OptionLink>
        {currentUser ? (
          <OptionDiv onClick={() => auth.signOut()}>SIGN OUT</OptionDiv>
        ) : (
          <OptionLink to='/signin'>SIGN IN</OptionLink>
        )}
        <CartIcon onClick={() => dispatch(toggleShowCart())} />
      </OptionsContainer>
      {show && <CartDropdown />}
    </HeaderContainer>
  )
}

export default NavBar
