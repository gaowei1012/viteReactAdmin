import { Layout, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { menu } from '@/config/index'
const { Item, SubMenu } = Menu
const { Sider } = Layout

const AppSider: React.FC<{
  collapsed: boolean
}> = ({ collapsed }) => {
  const [selectKey, setSelectKey] = useState<string[]>(['/'])
  const localtion = useLocation()

  useEffect(() => {
    setSelectKey([localtion.pathname])
  }, [])

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
          {m.subs ? (
            <SubMenu key={m.path} title={m.name} icon={<m.icon />}>
              {m.subs.map(item => {
                return (
                  <Item key={item.path} icon={<item.icon />}>
                    {!collapsed ? <> {item.name}</> : <></>}
                  </Item>
                )
              })}
            </SubMenu>
          ) : (
            <Item key={m.path} icon={<m.icon />}>
              {!collapsed ? <> {m.name}</> : <></>}
            </Item>
          )}
        </Menu>
      ))}
    </Sider>
  )
}

export default AppSider
