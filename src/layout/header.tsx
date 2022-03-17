import React from 'react'
import { Layout } from 'antd'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/hooks/useStore'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

const { Header } = Layout

type AppHeaderProps = {
  collapsed?: boolean
  layoutRight?: React.ReactElement
  isStyle?: boolean
}

const AppHeader: React.FC<AppHeaderProps> = observer(({ collapsed, layoutRight, isStyle }) => {
  const { layoutInstance } = useStore()
  return (
    <Header className='app-header'>
      {isStyle ? (
        <h3 style={{ marginLeft: 20 }}>养老CMS管理系统</h3>
      ) : (
        <React.Fragment>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: () => layoutInstance.setCollapsedState(!layoutInstance.getCollapsedState()),
            className: 'app-trigger',
          })}
        </React.Fragment>
      )}
      <div className='app-right' style={{ marginRight: isStyle ? 20 : !collapsed ? 240 : 120 }}>
        {layoutRight}
      </div>
    </Header>
  )
})

export default AppHeader
