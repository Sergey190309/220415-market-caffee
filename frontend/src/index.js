import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-less/semantic.less';

import './utils/init'
import './l10n/i18n'
import store from './redux/store'
import App from './components/App';
import Loader from './components/items/Loader'

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </React.Suspense>
      </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
