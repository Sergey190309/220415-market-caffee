import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
// import reducer from './reducers';
import reducer from './slices'
import rootSaga from "./saga";
// import { rootReducer } from './reducers';

const initialState = {};
const sagaMiddleware = createSagaMiddleware()

const middleware = [...getDefaultMiddleware({thunk: false}), sagaMiddleware];
// const middleware = [sagaMiddleware, thunk];

const store = configureStore({
  reducer,
  middleware,
  initialState
})

sagaMiddleware.run(rootSaga)

export default store;
