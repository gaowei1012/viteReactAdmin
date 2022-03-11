import React, { useState } from 'react'
import { Row, Col, Layout, Menu, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import '@/style/sview-style/usercenter.scss'
import { Profile, Security } from './MenuItem'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

import _ from 'lodash'

const { Content, Sider } = Layout
type menuKey = 'profile' | 'security'
const UserCenter: React.FC<{}> = observer(props => {
  const [currentMenu, setcurrentMenu] = useState<menuKey>('profile')
  const navigate = useNavigate()
  const MenuMap = {
    profile: {
      title: '个人资料',
      component: <Profile {...props} />,
    },
    security: {
      title: '账号安全',
      component: <Security {...props} />,
    },
  }

  const SelectMenu = (e: any) => {
    setcurrentMenu(e.key)
  }

  return (
    <div className='usercenter_container'>
      <Layout>
        <Row>
          <Col span={22} offset={1}>
            <Button icon={<LeftOutlined />} onClick={() => navigate(-1)}>
              返回
            </Button>
            <Layout className='site-layout-background' style={{ padding: '24px 0', marginTop: '10px' }}>
              <Sider className='site-layout-background' width={250}>
                <Menu mode='inline' selectedKeys={[currentMenu]} style={{ height: '100%' }} onClick={SelectMenu}>
                  {_.map(MenuMap, (item, key) => (
                    <Menu.Item key={key}>{item.title}</Menu.Item>
                  ))}
                </Menu>
              </Sider>
              <Content style={{ padding: '0 50px', minHeight: 300 }}>{MenuMap[currentMenu].component}</Content>
            </Layout>
          </Col>
        </Row>
      </Layout>
    </div>
  )
})

export default UserCenter
