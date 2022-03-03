import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/useStore'

import AppSider from './AppSider'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import '../styles/layout.scss'

const { Content } = Layout

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = observer(props => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const { loadingInstance } = useStore()
  return (
    <Layout>
      <AppSider collapsed={collapsed} {...props} />
      <Layout>
        <AppHeader setCollapsed={setCollapsed} collapsed={collapsed} {...props} />
        <Content className='app-content'>
          <Spin wrapperClassName='spin-wrap' spinning={loadingInstance.loading}>
            <Outlet />
          </Spin>
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  )
})

export default DefaultLayout
