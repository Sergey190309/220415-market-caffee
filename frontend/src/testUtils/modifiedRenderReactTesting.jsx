import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import alerts from '../redux/reducers/alert'
import device from '../redux/reducers/device'
import logIn from '../redux/reducers/auth'
import lng from '../redux/reducers/lng'

// import rootReducer from '../redux/reducers';
const rootReducer = combineReducers({
  alerts,
  device,
  logIn,
  lng
});

const connectedRender = (
  ui,
  { initialState, store = createStore(rootReducer, initialState), ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

const linkedRender = (ui, { ...renderOptions } = {}) => {
  const Wrapper = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

const connectedLinkedRender = (
  ui,
  { initialState, store = createStore(rootReducer, initialState), ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// const linkedRender = (ui) => {}

export * from '@testing-library/react';
export { connectedRender, linkedRender, connectedLinkedRender };
