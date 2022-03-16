import React, { useState } from 'react'
import { Menu, Layout } from 'antd'
import { useNavigate } from 'react-router-dom'
import { menu } from '@/config/index'

const { Sider } = Layout
const { Item, SubMenu } = Menu

const AppSider: React.FC<{
  collapsed: boolean
  logoTitle: string
}> = ({ collapsed, logoTitle }) => {
  const [selectKey, setSelectKey] = useState<string[]>(['/'])
  const navigate = useNavigate()

  const renderSubsMenu = (m: any, idx: number) => {
    return (
      <SubMenu key={idx} title={m.name} icon={<img className='icon' src={m.icon} />}>
        {m.subs.map((item: { path: React.Key | null | undefined; icon: any; name: any }) => {
          return (
            <Item key={item.path} icon={<img className='icon' src={item.icon} />}>
              {item.name}
            </Item>
          )
        })}
      </SubMenu>
    )
  }

  const renderMenuItem = (m: any) => {
    return (
      <Item key={m.path} icon={<img className='icon' src={m.icon} />}>
        {m.name}
      </Item>
    )
  }

  return (
    <Sider theme='light' trigger={null} collapsible collapsed={collapsed} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
      <div className='logo'>
        logo
        {/* <img className='img' onClick={() => goBackHome()} src={logo} alt={logoTitle} /> */}
        <span style={{ fontSize: '14px' }}>{logoTitle}</span>
      </div>
      <Menu
        theme='light'
        mode='inline'
        selectedKeys={selectKey}
        onClick={e => {
          setSelectKey([e.key])
          navigate(e.key)
        }}
      >
        {menu.map((m, idx) => {
          return m.subs && m.subs.length > 0 ? renderSubsMenu(m, idx) : renderMenuItem(m)
        })}
      </Menu>
    </Sider>
  )
}

export default AppSider
