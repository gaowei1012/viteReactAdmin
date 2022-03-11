import React, { useState, useEffect } from 'react'
import { Table, Avatar, Form, Card, TableColumnsType } from 'antd'
import '@/styles/view-style/leave.scss'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { base } from '@/config/index'
import moment from 'moment'

const Leave: React.FC<{}> = observer(() => {
  const { employeeInatance } = useStore()
  const { count, rows } = employeeInatance.get_leave_list_state()
  const [current, setCurrent] = useState<number>(1)
  const [queryForm] = Form.useForm()

  useEffect(() => {
    pagination(base.pagingConfig.page)
  }, [])

  /**
   * 分页
   */
  const pagination = async (page: number) => {
    setCurrent(page)
    await employeeInatance.get_employee_idle(page, base.pagingConfig.count, queryForm.getFieldsValue(true))
  }

  const leaveColumns: TableColumnsType = [
    {
      title: '姓名',
      width: 150,
      align: 'center',
      render: (text: any) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '50%' }}>
              <Avatar size='default' src={text.avatar_url} />
            </div>
            <div
              style={{
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
              }}
            >
              {text.name}
            </div>
          </div>
        )
      },
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      render: (text: string) => <>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</>,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      align: 'center',
      render: (text: string) => <>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</>,
    },
  ]

  return (
    <div className='leave_container'>
      <Card title='待职员工信息'>
        <Table
          size='middle'
          dataSource={rows}
          columns={leaveColumns}
          rowKey={(record: { user_id: number }) => record.user_id}
          pagination={{
            defaultPageSize: base.pagingConfig.count,
            defaultCurrent: count,
            onChange: pagination,
            total: count,
            current,
          }}
        />
      </Card>
    </div>
  )
})

export default Leave
