import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Auth from './pages/auth/auth.component'
import CheckoutPage from './pages/checkout/checkout.component'

// Components
import NavBar from './components/navbar/navbar.component'

// Auth
import { auth, createUser } from './firebase/firebase.utils'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

// Styles
import './App.scss'
// import { GlobalStyle } from './global.styles'

/*********************
 * MAIN APP
 ********************/
function App() {
  // Redux
  const dispatch = useDispatch()
  const { currentUser } = useSelector(state => state.user)

  const authHandler = async auth => {
    if (auth) {
      const userRef = await createUser(auth)
      userRef.onSnapshot(snap => {
        const user = {
          id: snap.id,
          ...snap.data()
        }
        dispatch(setCurrentUser(user))
      })
    } else {
      dispatch(setCurrentUser(auth))
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authHandler)
    return () => unsubscribe()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path='/'><HomePage /></Route>
        <Route path='/shop'><ShopPage /></Route>
        <Route path='/checkout'><CheckoutPage /></Route>
        <Route path='/signin'>
          {currentUser
            ? <Redirect to='/' />
            : <Auth />}
        </Route>
        <Redirect to='/' />
      </Switch>
    </>
  )
}

export default App
