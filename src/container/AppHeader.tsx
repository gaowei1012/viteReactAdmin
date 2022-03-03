import React from 'react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const { Header } = Layout

interface AppHeaderProps {
  collapsed: boolean
  setCollapsed: any
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed }) => {
  return (
    <Header className='app-header'>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        onClick: () => setCollapsed(!collapsed),
        className: 'app-trigger',
      })}
      {/* <div>header</div> */}
    </Header>
  )
}

export default AppHeader
