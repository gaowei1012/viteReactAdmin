import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Switch, Row, Col, Modal, Tag, Checkbox, Alert, Avatar } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import '@/styles/view-style/sys.scss'
import { base } from '@/config/index'
import _ from 'lodash'

const { Item }: any = Descriptions

const SysDetail: React.FC<{}> = observer(props => {
  const [checkRoles, setCheckRoles] = useState<any>([])
  const { employeeInatance, roleInatance, authorizationStoreInstance } = useStore()
  const { is_freeze, role_id, avatar_url, phone, age, gender, username, name, title, org_id, level } = employeeInatance.get_employee_detail_state()
  const { permission } = authorizationStoreInstance.get_login_state()
  const location = useLocation()
  const navigate = useNavigate()

  const PATH_ORG_ID = parseInt(location.pathname.split('/')[3])
  const PATH_USER_ID = parseInt(location.pathname.split('/')[4])

  useEffect(() => {
    get_sys_detail()
    get_roles_list()
  }, [])

  /**
   * 获取权限类型
   */
  const get_roles_list = async () => {
    const roles: any = await roleInatance.get_role_list(1, 20, { type: '1' })
    // 处理供给checkbox使用
    const _roles: any = []
    _.each(roles.rows, function (item) {
      _roles.push({
        label: item.role,
        value: item.role_id,
        level: item.level,
      })
    })
    setCheckRoles(_roles)
  }

  /**
   * 获取用户详情
   */
  const get_sys_detail = async () => {
    await employeeInatance.get_employee_detail(PATH_USER_ID, { org_id: PATH_ORG_ID })
  }

  /**
   * 冻结用户
   * @param event any
   */
  const handleFreeze = () => {
    const freeze_state = is_freeze === 0 ? '冻结' : '解冻'
    Modal.confirm({
      title: `确认${freeze_state}用户`,
      content: `是否${freeze_state}用户，${freeze_state}后该用户将${is_freeze === 0 ? '不能' : '可以'}通过后台管理系统参与当前机构的管理事务!`,
      okText: `${freeze_state}`,
      onOk: async () => {
        const data: any = {
          org_id: PATH_ORG_ID,
          freeze: is_freeze === 0 ? 1 : 0,
          user_id: PATH_USER_ID,
        }
        try {
          await employeeInatance.post_employee_freeze(data)
        } catch (err) {}

        get_sys_detail()
      },
    })
  }

  /**
   * 解雇用户
   */
  const unemployee = () => {
    Modal.confirm({
      title: '确认解雇用户',
      content: `是否解雇用户，解雇后该用户将不再是养老系统中的员工`,
      okText: `解雇`,
      onOk: async () => {
        const data: any = {
          org_id: PATH_ORG_ID,
        }
        try {
          await employeeInatance.delete_emloyee_unemployee(PATH_USER_ID, data)
          navigate(-1)
        } catch (err) {}
      },
    })
  }

  /**
   * 解职/任职用户
   */
  const handleChecked = (event: any) => {
    const _xor: any = _.xorWith(role_id, event) //获取选中role的id
    const selectedRole = _.filter(checkRoles, role => {
      //获取选中role的label
      return role.value === _xor[0]
    })[0].label
    const isIncludes = _.includes(role_id, _xor[0])
    const operationType = isIncludes ? `是否解除【${name}】在【${title}】的【${selectedRole}】职务` : `是否任命【${name}】为【${title}】的【${selectedRole}】`
    const warnMsg = isIncludes && role_id.length === 1 ? <Alert message='警告' description='将该员工唯一职位解除后,员工将不存在于当前机构的员工列表中' type='warning' /> : ''
    Modal.confirm({
      title: `职务变动确认`,
      width: 500,
      content: (
        <>
          {warnMsg}
          <br />
          <div>{operationType}</div>
        </>
      ),
      okText: `确定`,
      onOk: async () => {
        // post data
        const data: any = {
          org_id: PATH_ORG_ID,
          role_id: parseInt(_xor[0]),
          user_id: PATH_USER_ID,
        }
        // del data
        const delData: any = {
          org_id: PATH_ORG_ID,
          role_id: parseInt(_xor[0]),
        }
        if (isIncludes) {
          await employeeInatance.delete_employee_revokerole(PATH_USER_ID, delData)
          //当移除的是员工在本机构最后一个职务时，移除后返回系统用户管理页面
          if (role_id.length === 1) return navigate(-1)
        } else {
          await employeeInatance.post_employee_assignrole(data)
        }
        get_sys_detail()
      },
    })
  }

  const renderRoleList = () => {
    if (permission.org_id != org_id) {
      return <Checkbox.Group options={checkRoles} value={role_id} onChange={handleChecked} />
    }
    if (permission.level >= level) {
      return <Checkbox.Group options={checkRoles} value={role_id} onChange={handleChecked} disabled />
    }
    const availableRole = _.filter(checkRoles, role => {
      return role.level > permission.level
    })
    return <Checkbox.Group options={availableRole} value={role_id} onChange={handleChecked} />
  }

  return (
    <div className='sys_detail'>
      <Row className='header' justify='space-between'>
        <Col span={6}>
          <Button type='link' icon={<LeftOutlined />} onClick={() => navigate(-1)}>
            返回
          </Button>
        </Col>
        <Col span={6}></Col>
      </Row>
      <Row className='detail_content' justify='center'>
        <Col span={11}>
          {
            <Descriptions title='基本信息' column={{ md: 1 }}>
              <Item label='头像' labelStyle={{ alignItems: 'center' }}>
                {avatar_url ? <Avatar size='large' src={avatar_url} /> : <Tag color='cyan'>暂无头像</Tag>}
              </Item>
              <Item label='用户名'>{username}</Item>
              <Item label='姓名'>{name}</Item>
              <Item label='手机号码'>{phone}</Item>
              <Item label='年龄'>{age}</Item>
              <Item label='性别'>
                <Tag>{base.gender[parseFloat(`${gender}`)]}</Tag>
              </Item>
              <Item label='所在机构'>{title}</Item>
            </Descriptions>
          }
        </Col>
        <Col span={11}>
          <Descriptions title='任职/解职'>
            <Item>{renderRoleList()}</Item>
          </Descriptions>
          <Descriptions title='解雇用户'>
            <Item>
              <Button size='small' type='primary' danger onClick={unemployee}>
                解雇
              </Button>
            </Item>
          </Descriptions>
          <Descriptions title='冻结用户'>
            <Item>
              <Switch checked={is_freeze === 0 ? false : true} onChange={handleFreeze} checkedChildren='开启' unCheckedChildren='冻结' />
            </Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  )
})

export default SysDetail
