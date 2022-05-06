import { configureStore } from '@reduxjs/toolkit'

import createSagaMiddleware from 'redux-saga'

import reducer from './slices'
import rootSaga from './saga'

// console.log('store.js')

const initialState = {}
const sagaMiddleware = createSagaMiddleware()

const middleware = (getDefaultMiddleware) => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]

const store = configureStore({
  reducer,
  middleware,
  initialState
})

sagaMiddleware.run(rootSaga)

export default store
