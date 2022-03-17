import React from 'react'
import { useStore } from '@/hooks/useStore'
import { Layout } from 'antd'
import '@/styles/layout.scss'

const { Content } = Layout

const DefaultLayout: React.FC<{
  appSider?: React.ReactElement
  appHeader?: React.ReactElement
  routeOutlet: React.ReactElement
  isStyle?: boolean
}> = props => {
  const { appSider, routeOutlet, appHeader, isStyle } = props
  const { layoutInstance } = useStore()
  const _marginLeft = !layoutInstance.getCollapsedState() ? 200 : 80
  return (
    <Layout hasSider>
      {appSider}
      <Layout
        style={{
          minHeight: '100vh',
          marginLeft: isStyle ? 0 : _marginLeft,
        }}
      >
        {appHeader}
        <Content>{routeOutlet}</Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
