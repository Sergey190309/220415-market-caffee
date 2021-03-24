import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from '../redux/reducers';

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
