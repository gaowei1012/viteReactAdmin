import React from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from './hooks/useStore'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import App from './app'

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <StoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreProvider>
  </ConfigProvider>,
  document.getElementById('root')
)
