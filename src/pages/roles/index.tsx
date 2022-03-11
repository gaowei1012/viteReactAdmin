import React, { useState, useEffect } from 'react'
import { Button, Table, Form, TableColumnsType } from 'antd'
import { SafetyCertificateOutlined } from '@ant-design/icons'
import { levelOpt, base } from '@/config/index'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import '@/styles/view-style/roles.scss'
import moment from 'moment'

import AddRole from './addRole'
import EditRole from './editRole'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

const Roles: React.FC<any> = observer(() => {
  const [addRoleVisibled, setAddRoleVisibled] = useState<boolean>(false)
  const [editRoleVisibled, setEditRoleVisibled] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(1)
  const { roleInatance } = useStore()
  const [queryForm] = Form.useForm()

  const { count, rows } = roleInatance.get_role_list_state()
  const localtion = useLocation()
  const params = useParams()
  const query = useSearchParams()

  useEffect(() => {
    pagination(base.pagingConfig.page)
  }, [])

  console.log(localtion, params, query)

  /**
   * 获取角色列表分页
   */
  const pagination = async (page: number) => {
    setCurrent(page)
    await roleInatance.get_role_list(page, base.pagingConfig.count, queryForm.getFieldsValue(true))
  }

  /**
   * 编辑角色
   * @param record 当前点击行数据
   */
  const editRole = (record: any) => {
    roleInatance.set_edit_state(record)
    setEditRoleVisibled(true)
  }

  const roleColumns: TableColumnsType = [
    { title: '角色名称', dataIndex: 'role', key: 'role', align: 'center' },
    { title: '角色层级', dataIndex: 'level', key: 'level', align: 'center', render: (text: number) => <>{levelOpt[text]}</> },
    { title: '角色类型', dataIndex: 'type', align: 'center', render: (text: string) => <span>{text == '0' ? '业务角色' : '系统角色'}</span> },
    { title: '更新时间', dataIndex: 'updatedAt', align: 'center', render: (text: string) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span> },
    {
      title: '操作',
      width: '10%',
      align: 'center',
      render: (record: any) => (
        <Button type='link' onClick={() => editRole(record)}>
          编辑
        </Button>
      ),
    },
  ]

  return (
    <div className='role_container__flow'>
      <div className='role_header__flow'>
        <React.Fragment>
          <SafetyCertificateOutlined />
          <span>角色管理</span>
        </React.Fragment>
        <Button
          type='primary'
          onClick={() => {
            setAddRoleVisibled(true)
          }}
        >
          添加
        </Button>
      </div>
      <div className='role_table_flow'>
        <Table
          size='middle'
          dataSource={rows}
          columns={roleColumns}
          rowKey={(record: { role_id: number }) => record.role_id}
          pagination={{
            defaultPageSize: base.pagingConfig.count,
            defaultCurrent: count,
            onChange: pagination,
            total: count,
            current,
          }}
        />
      </div>

      {/* 添加权限 */}
      <AddRole addRoleVisibled={addRoleVisibled} setAddRoleVisibled={setAddRoleVisibled} />
      {/* 编辑权限 */}
      <EditRole editRoleVisibled={editRoleVisibled} setEditRoleVisibled={setEditRoleVisibled} />
    </div>
  )
})

export default Roles
