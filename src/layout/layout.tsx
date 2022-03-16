import React from 'react'
import { useStore } from '@/hooks/useStore'
import { Layout } from 'antd'
import '@/styles/layout.scss'

const { Content } = Layout

const DefaultLayout: React.FC<{
  appSider?: React.ReactElement
  appHeader?: React.ReactElement
  routeOutlet: React.ReactElement
}> = props => {
  const { appSider, routeOutlet, appHeader } = props
  const { layoutInstance } = useStore()
  return (
    <Layout hasSider>
      {appSider}
      <Layout
        style={{
          minHeight: '100vh',
          marginLeft: !layoutInstance.getCollapsedState() ? 200 : 80,
        }}
      >
        {appHeader}
        <Content>{routeOutlet}</Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
