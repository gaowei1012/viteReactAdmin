import React from 'react'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/hooks/useStore'

const { Header } = Layout

type AppHeaderProps = {
  collapsed?: boolean
  layoutRight?: React.ReactElement
}

const AppHeader: React.FC<AppHeaderProps> = observer(({ collapsed, layoutRight }) => {
  const { layoutInstance } = useStore()
  return (
    <Header className='app-header'>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        onClick: () => layoutInstance.setCollapsedState(!layoutInstance.getCollapsedState()),
        className: 'app-trigger',
      })}
      <div className='app-right' style={{ marginRight: !collapsed ? 240 : 120 }}>
        {layoutRight}
      </div>
    </Header>
  )
})

export default AppHeader
