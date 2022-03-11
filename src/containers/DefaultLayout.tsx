import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Layout, Spin, Dropdown, Avatar, Tag, Menu } from 'antd'
import { EditOutlined, UserSwitchOutlined, LoginOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/hooks/useStore'

import AppSider from './AppSider'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'
import '@/styles/layout.scss'

const { Content } = Layout

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = observer(props => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const { loadingInstance, authorizationStoreInstance } = useStore()
  const navigate = useNavigate()

  const loginOut = async () => {
    await authorizationStoreInstance.logout()
    localStorage.clear()
    navigate('/login')
    // window.location.reload()
  }

  const menu = () => (
    <Menu>
      <Menu.Item>
        <span style={{ display: 'inline-block', width: '100%' }} onClick={() => navigate('/usercenter')}>
          <EditOutlined /> 个人中心
        </span>
      </Menu.Item>
      <Menu.Item>
        <span style={{ display: 'inline-block', width: '100%' }} onClick={() => navigate('/chooseorg')}>
          <UserSwitchOutlined /> 切换身份
        </span>
      </Menu.Item>
      <Menu.Item>
        <span style={{ display: 'inline-block', width: '100%' }} onClick={loginOut}>
          <LoginOutlined /> 退出登录
        </span>
      </Menu.Item>
    </Menu>
  )

  const renderDrow = () => {
    return (
      <Dropdown overlay={menu} overlayStyle={{ width: '20rem' }}>
        <div className='ant-dropdown-link' style={{ cursor: 'pointer' }}>
          <Avatar icon='user' src={authorizationStoreInstance.get_login_state().profile.avatar_url} alt='avatar' />
          <Tag style={{ marginLeft: 10 }} color='blue'>
            {authorizationStoreInstance.get_login_state().profile.name}
          </Tag>
        </div>
      </Dropdown>
    )
  }
  return (
    <Layout>
      <AppSider collapsed={collapsed} {...props} />
      <Layout>
        <AppHeader setCollapsed={setCollapsed} collapsed={collapsed} {...props} layoutRight={renderDrow} />
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
