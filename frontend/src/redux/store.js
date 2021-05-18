import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers';
import rootSaga from "./saga/index";
// import { rootReducer } from './reducers';

const initialState = {};
const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware];
// const middleware = [sagaMiddleware, thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga)

export default store;
