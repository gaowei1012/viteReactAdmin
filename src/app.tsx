import React from 'react'
import { useMatch } from 'react-router-dom'

import { StoreProvider } from './hooks/useStore'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import ViewRoutes from '@/routes/view'

import '@/styles/app.scss'
import '@/styles/base.scss'

const App: React.FC<{}> = () => {
  return (
    <ConfigProvider locale={zh_CN}>
      <StoreProvider>
        <BrowserRouter>
          <ViewRoutes />
        </BrowserRouter>
      </StoreProvider>
    </ConfigProvider>
  )
}

export default App
