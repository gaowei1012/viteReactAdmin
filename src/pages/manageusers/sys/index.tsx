import React, { useState, useEffect } from 'react'
import { RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { Row, Col, Input, Tabs } from 'antd'
import SearchTree from '@/components/SearchTree'
import { useStore } from '@/hooks/useStore'
import '@/styles/view-style/sys.scss'
import { observer } from 'mobx-react-lite'
import QueueAnim from 'rc-queue-anim'
import { EnrolledEmployee } from './enrolled'
import { PendingEmployee } from './pending'

const SysUser: React.FC<{}> = observer(props => {
  const [orgId, setOrgId] = useState<number>(0)
  const [tabState, setTabState] = useState<'pending' | 'enrolled' | 'default'>('default')
  const [show, setShow] = useState<boolean>(false)
  const [changeValue, setChangeValue] = useState<any>(null)
  const { organizationInatance } = useStore()

  const location = useLocation()
  const navigate = useNavigate()

  let path_org_id = parseInt(location.pathname.split('/')[3])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      await get_org_list()
      path_org_id = path_org_id ? path_org_id : organizationInatance.get_org_list_state()[0].org_id
      await selectedOrg([path_org_id], { selected: true })
      setTabState('enrolled')
    })()
  }, [])

  useEffect(() => {
    if (!orgId) return // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      navigate(`/user/sys/${orgId}`)
    })()
  }, [orgId])

  const tabPaneData = [
    {
      title: '在职员工',
      key: 'enrolled',
      component: <EnrolledEmployee orgId={orgId} tabState={tabState} {...props} />,
    },
    {
      title: '邀请列表',
      key: 'pending',
      component: <PendingEmployee orgId={orgId} tabState={tabState} {...props} />,
    },
  ]

  const switchTab = (e: 'pending' | 'enrolled') => {
    setTabState(e)
  }

  /**
   * 获取组织机构列表
   */
  const get_org_list = async () => {
    await organizationInatance.get_organization()
  }

  /**
   * 模糊查询
   * 筛选组织机构
   */
  const searchOrg = (event: { target: { value: string } }) => {
    setChangeValue(event.target.value)
  }

  /**
   * 选择组织机构
   */
  const selectedOrg = async (event: any, info: any) => {
    if (info.selected) {
      setOrgId(event[0])
    }
  }

  return (
    <div className='sys_container'>
      <Row>
        <Col className='left_wrap' span={6}>
          <div className='left_tree'>
            <h3>组织机构</h3>
            <QueueAnim delay={300} type={['right', 'left']} ease={['easeOutQuart', 'easeInOutQuart']}>
              {show ? <Input placeholder='查询组织机构' onChange={searchOrg} /> : null}
            </QueueAnim>
            <div className='com_flow'>
              <SearchOutlined onClick={() => setShow(!show)} className='search' />
              <RedoOutlined className='refresh' onClick={() => get_org_list()} />
            </div>
          </div>
          {
            <SearchTree
              onSelect={selectedOrg}
              filter={changeValue}
              data={organizationInatance.get_org_list_state()}
              //   defaultExpandedKeys={[path_org_id.toString()]}
              //   autoExpandParent={true}
              selectedKeys={[orgId.toString()]}
            />
          }
        </Col>
        <Col span={18}>
          <Tabs activeKey={tabState} type='card' onTabClick={switchTab}>
            {tabPaneData.map(tab => (
              <Tabs.TabPane className='tabpane' key={tab.key} tab={tab.title}>
                {tab.component}
              </Tabs.TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
    </div>
  )
})

export default SysUser
