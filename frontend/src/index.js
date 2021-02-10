import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import 'semantic-ui-less/semantic.less'
// import 'semantic-ui-css/semantic.min.css';

import App from "./components/App";
import { Provider } from "react-redux";

import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
