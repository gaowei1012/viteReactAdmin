import React from 'react'
import { StoreProvider } from './hooks/useStore'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale/zh_CN'
import BaseRoutes from '@/routes/base'

import '@/styles/app.scss'
import '@/styles/base.scss'

const App: React.FC<{}> = () => {
  return (
    <ConfigProvider locale={zh_CN}>
      <StoreProvider>
        <BrowserRouter>
          <BaseRoutes />
        </BrowserRouter>
      </StoreProvider>
    </ConfigProvider>
  )
}

export default App
