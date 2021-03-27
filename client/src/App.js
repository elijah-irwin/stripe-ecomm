import React, { useEffect, lazy, Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// Pages
import HomePage from './pages/homepage/homepage.component'

// Components
import NavBar from './components/navbar/navbar.component'
import Spinner from './components/spinner/spinner.component'
import ErrorBoundary from './components/error-boundary/error-boundary.component'

// Auth
import { auth, createUser } from './firebase/firebase.utils'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from './redux/user/user.actions'

// Styles
import './App.scss'

// Lazy Loaded Dynamic Pages
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const Auth = lazy(() => import('./pages/auth/auth.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))

/*********************
 * MAIN APP
 ********************/
const App = () => {
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
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
