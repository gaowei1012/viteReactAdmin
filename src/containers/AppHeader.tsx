import React from 'react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const { Header } = Layout

interface AppHeaderProps {
  collapsed: boolean
  setCollapsed: any
  layoutRight: any
}

const AppHeader: React.FC<AppHeaderProps> = ({ collapsed, setCollapsed, layoutRight }) => {
  return (
    <Header className='app-header'>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        onClick: () => setCollapsed(!collapsed),
        className: 'app-trigger',
      })}
      <div className='app-right'>{layoutRight()}</div>
    </Header>
  )
}

export default AppHeader
