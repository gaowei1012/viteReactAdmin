import React, { useEffect, useState } from 'react'
import { Row, Col, Form, Input, Button, Table, Modal, Avatar, Card } from 'antd'
import { CloudUploadOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import SearchTree from '@/components/SearchTree'
import UploadBusiness from './gerneralUpload/upload'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { base } from '@/config/index'
import '@/styles/view-style/sys.scss'
import QueueAnim from 'rc-queue-anim'
import moment from 'moment'
import _ from 'lodash'

const Gerneral: React.FC<{}> = observer(props => {
  const [uploadVisibled, setUploadVisibled] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [orgId, setOrgId] = useState<number>(0)
  const [changeValue, setChangeValue] = useState<any>(null)
  const [current, setCurrent] = useState<number>(1)
  const [expandKeys, setExpandKeys] = useState<string[]>([])
  const [queryForm] = Form.useForm()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()

  const { organizationInatance, gerneralInatance } = useStore()
  const { count, rows } = gerneralInatance.get_gerneral_list_state()
  console.log(params)
  let PATH_ORG_ID = 3
  useEffect(() => {
    ;(async () => {
      await get_org_list()
      PATH_ORG_ID = PATH_ORG_ID ? PATH_ORG_ID : organizationInatance.get_org_list_state()[0].org_id
      await selectedOrg([PATH_ORG_ID], { selected: true, node: organizationInatance.get_org_list_state()[0] })
    })()
  }, [])

  useEffect(() => {
    if (!orgId) return
    ;(async () => {
      queryForm.resetFields()
      await pagination(base.pagingConfig.page)
      console.log('org_id', orgId)
      navigate(`/user/general/${orgId}`)
    })()
  }, [orgId])

  /**
   * 获取组织机构列表
   */
  const get_org_list = async () => {
    await organizationInatance.get_organization()
  }

  /**
   * 模糊查询
   * 前端本地查询
   */
  const searchOrg = (event: any) => {
    setChangeValue(event.target.value)
  }

  /**
   * 冻结/解冻业务用户
   */
  const freeze_user = async (userId: number, orgId: number, inactive: number) => {
    const activeText: string = inactive === 1 ? '解禁' : '禁用'
    Modal.confirm({
      title: `是否${activeText}结用户?`,
      content: `${activeText}后，用户将${inactive === 1 ? '可以' : '不能'}登录APP`,
      okText: `${activeText}`,
      onOk: async () => {
        const _active: number = inactive === 1 ? 1 : 0
        const data: any = {
          user_id: userId,
          org_id: orgId,
          active: _active,
        }
        await gerneralInatance.gerneral_user_freeze(data)
        // 是否选择组织机构
        await pagination(current)
      },
    })
  }

  /**
   * 选择组织机构
   */
  const selectedOrg = async (event: any, info: any) => {
    const { node } = info
    if (info.selected) {
      if (!node.children || node.children.length == 0) setOrgId(event[0])
      else {
        const tmp: string[] = [...expandKeys]
        _.includes(tmp, event[0].toString()) ? _.pull(tmp, event[0].toString()) : tmp.push(event[0].toString())
        setExpandKeys(tmp)
      }
    }
  }

  /**
   * 获取业务用户列表
   * 分页
   */
  const pagination = async (page: number) => {
    setCurrent(page)
    await gerneralInatance.gerneral_user_list(orgId, page, base.pagingConfig.count, queryForm.getFieldsValue(true))
  }

  /**
   * 列表模糊查询
   * @param value 表单值
   */
  const confirm_search = async () => {
    await pagination(base.pagingConfig.page)
  }

  const sysColumns: any = [
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
      title: '所在社区',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '身份',
      dataIndex: 'roles',
      align: 'center',
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
          <>
            <Button
              type='link'
              onClick={() => {
                navigate(`/user/general/${orgId}/${text.user_id}`)
              }}
            >
              详情
            </Button>
            <Button type='link' danger onClick={() => freeze_user(text.user_id, text.org_id, text.is_inactive)}>
              {text.is_inactive === 1 ? '解禁' : '禁用'}
            </Button>
          </>
        )
      },
    },
  ]

  const onExpand = (keys: any) => {
    setExpandKeys(keys)
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
          <SearchTree
            onSelect={selectedOrg}
            filter={changeValue}
            data={organizationInatance.get_org_list_state()}
            defaultExpandedKeys={[PATH_ORG_ID.toString()]}
            // autoExpandParent={true}
            selectedKeys={[orgId.toString()]}
            onExpand={onExpand}
            expandedKeys={expandKeys}
          />
        </Col>
        <Col span={18}>
          <div className='right_content'>
            <Card title='居民管理'>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <CloudUploadOutlined onClick={() => setUploadVisibled(true)} style={{ fontSize: 20 }} />
                </Col>
                <Col span={8} offset={8}>
                  <Form onFinish={confirm_search} form={queryForm} layout='inline' style={{ justifyContent: 'end' }}>
                    <Form.Item name='name'>
                      <Input placeholder='请输入查询姓名' />
                    </Form.Item>
                    <Form.Item>
                      <Button type='primary' htmlType='submit'>
                        查询
                      </Button>
                    </Form.Item>
                  </Form>
                </Col>
                <Col span={24}>
                  <Table
                    size='middle'
                    dataSource={rows}
                    columns={sysColumns}
                    rowKey={record => record.user_id}
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
            </Card>
          </div>
        </Col>
      </Row>
      <UploadBusiness setUploadVisibled={setUploadVisibled} uploadVisibled={uploadVisibled} orgId={orgId} getOrgList={get_org_list} />
    </div>
  )
})

export default Gerneral
