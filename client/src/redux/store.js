// External Imports
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

// Reducers
import userReducer from './user/user.reducer'
import cartReducer from './cart/cart.reducer'
import directoryReducer from './directory/directory.reducer'
import shopReducer from './shop/shop.reducer'

// Redux Persist Config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart']
}

// Root Reducer
const reducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
})

// Persisted Root Reducer
const persistedReducer = persistReducer(persistConfig, reducer)

// Redux Specific Middleware
const middlewares = [thunk]

// Redux Store
export const store = createStore(persistedReducer, composeWithDevTools(
  applyMiddleware(...middlewares))
)

// Redux Persistor
export const persistor = persistStore(store)
