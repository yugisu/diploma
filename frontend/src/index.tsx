import './tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom'

import { authService } from 'services/authService'

import { App } from 'containers/App/App'

authService.checkToken()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

if (import.meta.hot) {
  import.meta.hot.accept()
}
