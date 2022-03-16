import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Dropdown, Avatar, Tag, Menu } from 'antd'
import { UserOutlined, EditOutlined, UserSwitchOutlined, LoginOutlined } from '@ant-design/icons'

const AppHeaderRightElement = () => {
  const navigate = useNavigate()
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
    <Dropdown overlay={menu} overlayStyle={{ width: '20rem' }}>
      <div className='ant-dropdown-link' style={{ cursor: 'pointer' }}>
        <Avatar icon={<UserOutlined />} alt='avatar' />
        <Tag style={{ marginLeft: 10 }} color='blue'>
          管理员
        </Tag>
      </div>
    </Dropdown>
  )
}

export default AppHeaderRightElement
