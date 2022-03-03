import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'

import AppSider from './AppSider'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import '../styles/layout.scss'

const { Content } = Layout

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = props => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  return (
    <Layout>
      <AppSider collapsed={collapsed} {...props} />
      <Layout>
        <AppHeader setCollapsed={setCollapsed} collapsed={collapsed} {...props} />
        <Content className='app-content'>
          <Outlet />
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
