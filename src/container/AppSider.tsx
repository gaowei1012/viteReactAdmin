import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DesktopOutlined } from '@ant-design/icons'
import { menu } from '../config'
const { Item } = Menu
const { Sider } = Layout

interface AppSiderProps {
  collapsed: boolean
}

const AppSider: React.FC<AppSiderProps> = ({ collapsed }) => {
  const [selectKey, setSelectKey] = useState<string[]>(['/'])
  const navigate = useNavigate()

  return (
    <Sider theme='light' trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
      {menu.map((m, idx) => (
        <Menu
          theme='light'
          mode='inline'
          selectedKeys={selectKey}
          key={idx}
          onClick={e => {
            setSelectKey([e.key])
            navigate(e.key)
          }}
        >
          <Item key={m.path} icon={<DesktopOutlined />}>
            {!collapsed ? <> {m.name}</> : <></>}
          </Item>
        </Menu>
      ))}
    </Sider>
  )
}

export default AppSider
