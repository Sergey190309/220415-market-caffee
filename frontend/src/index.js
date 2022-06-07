import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// import 'semantic-ui-css/semantic.min.css'

import './inits/init'
import './l10n/i18n'
import store from './redux/store'

import App from './component/App'
import 'animate.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>
)
