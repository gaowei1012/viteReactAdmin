import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from './hooks/useStore'
import { BrowserRouter } from 'react-router-dom'
import App from './app'

ReactDOM.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root')
)
