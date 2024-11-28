import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import store from './core/store/app.store'
import { Provider } from 'react-redux'


import App from './App'
import Spinner from './core/spinner/spinner'

// As of React 18


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
      <Spinner />
      <App />
    </Provider>,
)