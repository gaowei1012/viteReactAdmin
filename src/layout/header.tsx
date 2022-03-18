import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/hooks/useStore'
import { useNavigate } from 'react-router-dom'
import { Layout, Dropdown, Avatar, Tag, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, EditOutlined, UserSwitchOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons'

const { Header } = Layout

type AppHeaderProps = {
  collapsed?: boolean
  isStyle?: boolean
}

const AppHeader: React.FC<AppHeaderProps & any> = observer(({ collapsed, is_style, sider }) => {
  const { layoutInstance } = useStore()
  const navigate = useNavigate()

  const is_show = is_style == true && sider == false ? true : false

  const loginOut = async () => {
    localStorage.clear()
    navigate('/login')
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
  return (
    <Header className='app-header'>
      {is_show ? (
        <h3 style={{ marginLeft: 20 }}>CMS管理系统</h3>
      ) : (
        <React.Fragment>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            onClick: () => layoutInstance.setCollapsedState(!layoutInstance.getCollapsedState()),
            className: 'app-trigger',
          })}
        </React.Fragment>
      )}
      <div className='app-right' style={{ marginRight: is_show ? 20 : !collapsed ? 240 : 120 }}>
        <Dropdown overlay={menu} overlayStyle={{ width: '20rem' }}>
          <div className='ant-dropdown-link' style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} alt='avatar' />
            <Tag style={{ marginLeft: 10 }} color='blue'>
              管理员
            </Tag>
          </div>
        </Dropdown>
      </div>
    </Header>
  )
})

export default AppHeader
