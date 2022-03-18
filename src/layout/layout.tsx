import React from 'react'
import { useStore } from '@/hooks/useStore'
import { Layout, Spin } from 'antd'
import '@/styles/layout.scss'

const { Content } = Layout

const DefaultLayout: React.FC<
  {
    appSider?: React.ReactElement
    appHeader?: React.ReactElement
    routeOutlet: React.ReactElement
    isStyle?: boolean
  } & any
> = props => {
  const { appSider, routeOutlet, appHeader, is_style, sider } = props
  const { layoutInstance, loadingInstance } = useStore()
  const _marginLeft = !layoutInstance.getCollapsedState() ? 200 : 80
  const is_show = is_style == true && sider == false ? true : false

  return (
    <Layout hasSider>
      {appSider}
      <Layout
        style={{
          minHeight: '100vh',
          marginLeft: is_show ? 0 : _marginLeft,
        }}
      >
        {appHeader}
        <Content className='app-content'>
          <Spin wrapperClassName='spin-wrap' spinning={loadingInstance.loading}>
            {routeOutlet}
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
