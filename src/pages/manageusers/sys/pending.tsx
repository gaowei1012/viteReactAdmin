import React, { useState, useEffect } from 'react'
import { UserAddOutlined, CopyTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { Table, Tooltip, notification, Tag, Modal, Row, Col, TableColumnsType } from 'antd'
import { useStore } from '@/hooks/useStore'
import '@/styles/view-style/sys.scss'
import { observer } from 'mobx-react-lite'
import Invited from './invitationModal'
import moment from 'moment'
import _ from 'lodash'

export const PendingEmployee: React.FC<any & { orgId: number; tabState: 'pending' | 'enrolled' | 'default' }> = observer(props => {
  const [visibled, setVisibled] = useState<boolean>(false)
  const { exployeeListInstance } = useStore()
  const { orgId, tabState } = props

  useEffect(() => {
    if (tabState != 'pending' || !orgId) return // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      exployeeListInstance.init()
      await exployeeListInstance.request_pending_employee_list(orgId)
    })()
  }, [orgId, tabState])

  const copyInvitationURL = async (url: string) => {
    await navigator.clipboard.writeText(url)
    notification['success']({
      message: '已复制邀请链接至剪贴板',
      duration: 2,
    })
  }

  const revokeInvitation = (orgId: number, phone: string) => {
    Modal.confirm({
      title: `取消邀请`,
      content: `是否确认取消对【${phone}】的邀请`,
      okText: '确定',
      onOk: async () => {
        try {
          await exployeeListInstance.revoke_pending_invitation(orgId, phone)
          exployeeListInstance.request_pending_employee_list(orgId)
        } catch (err) {}
      },
    })
  }

  const sysColumns: TableColumnsType = [
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '职务',
      dataIndex: 'roles',
      align: 'center',
      render: (roles: any) => (
        <>
          {_.map(roles, role => {
            return `[${role.role}]`
          })}
        </>
      ),
    },
    {
      title: '过期时间',
      dataIndex: 'exp',
      align: 'center',
      render: (text: number) => <Tag color='orange'>{moment(text).from(moment())}</Tag>,
    },
    {
      title: '发起人',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '操作',
      width: 150,
      align: 'center',
      render: (text: any) => {
        return (
          <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Tooltip title='获取邀请链接' color='blue' key={text.exp}>
              <CopyTwoTone style={{ cursor: 'pointer', fontSize: 20 }} onClick={() => copyInvitationURL(text.url)} />
            </Tooltip>
            <DeleteTwoTone twoToneColor='#eb2f96' style={{ cursor: 'pointer', fontSize: 20 }} onClick={() => revokeInvitation(text.org_id, text.phone)} />
          </span>
        )
      },
    },
  ]

  return (
    <div className='right_content'>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <UserAddOutlined style={{ fontSize: 20 }} onClick={() => setVisibled(true)} />
        </Col>
        <Col span={24}>
          <Table size='middle' dataSource={exployeeListInstance.get_pending_list()} columns={sysColumns} rowKey={(record: { exp: never }) => record.exp} pagination={false} />
        </Col>
      </Row>
      <Invited visibled={visibled} setVisibled={setVisibled} orgId={orgId} />
    </div>
  )
})
