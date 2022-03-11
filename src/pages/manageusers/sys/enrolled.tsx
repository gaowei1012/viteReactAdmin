import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Table, Tag, Avatar, Row, Col, TableColumnsType } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import '@/styles/view-style/sys.scss'
import { base } from '@/config/index'
import moment from 'moment'

export const EnrolledEmployee: React.FC<{} & { orgId: number; tabState: 'pending' | 'enrolled' | 'default' }> = observer(props => {
  const [current, setCurrent] = useState<number>(1)
  const [queryForm] = Form.useForm()
  const { employeeInatance } = useStore()
  const { count, rows } = employeeInatance.get_employee_list_state()
  const { orgId, tabState } = props
  const navigate = useNavigate()

  useEffect(() => {
    if (tabState != 'enrolled' || !orgId) return // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      queryForm.resetFields()
      await pagination(base.pagingConfig.page)
    })()
  }, [orgId, tabState])

  /**
   *  获取机构员工分页
   */
  const pagination = async (page: number) => {
    setCurrent(page)
    await employeeInatance.get_employee_list(orgId, page, base.pagingConfig.count, queryForm.getFieldsValue(true))
  }

  /**
   * 模糊查询
   * @param value 表单值
   */
  const confirm_search = async () => {
    await pagination(base.pagingConfig.page)
  }

  const sysColumns: TableColumnsType = [
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
      title: '职务',
      dataIndex: 'roles',
      align: 'center',
    },
    {
      title: '是否冻结',
      dataIndex: 'is_freeze',
      align: 'center',
      render: (text: number) => <>{text === 0 ? <Tag color='cyan'>正常</Tag> : <Tag color='blue'>冻结</Tag>}</>,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      align: 'center',
      render: (text: string) => <>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</>,
    },
    {
      title: '操作',
      align: 'center',
      render: (text: any) => {
        return (
          <Button
            onClick={() => {
              navigate(`/user/sys/${text.org_id}/${text.user_id}`)
            }}
            type='link'
          >
            详情
          </Button>
        )
      },
    },
  ]

  return (
    <div className='right_content'>
      <Row gutter={[16, 16]}>
        <Col span={8} offset={16}>
          <Form onFinish={confirm_search} form={queryForm} layout='inline' style={{ justifyContent: 'end' }}>
            <Form.Item name='name'>
              <Input placeholder='请输入姓名' />
            </Form.Item>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                查询
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {/* </Row>
      <Row> */}
        <Col span={24}>
          <Table
            size='middle'
            dataSource={rows}
            columns={sysColumns}
            rowKey={(record: { user_id: number }) => record.user_id}
            pagination={{
              defaultPageSize: base.pagingConfig.count,
              defaultCurrent: count,
              onChange: pagination,
              total: count,
              current,
            }}
          />
        </Col>
      </Row>
    </div>
  )
})
