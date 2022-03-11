import React, { useEffect } from 'react'
import { Descriptions, Row, Col, Button, Tag, Avatar } from 'antd'
import { useLocation } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import { LeftOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import { base } from '@/config/index'
const { Item } = Descriptions

const GerneralDetail: React.FC<any> = observer(props => {
  const { gerneralInatance } = useStore()
  const { username, name, phone, age, gender, is_inactive, title, avatar_url, roles } = gerneralInatance.get_gerneral_detail_state()
  const location = useLocation()

  const PATH_ORG_ID = parseInt(location.pathname.split('/')[3])
  const PATH_USER_ID = parseInt(location.pathname.split('/')[4])

  useEffect(() => {
    ;(async () => {
      await gerneralInatance.gerneral_user_detail(PATH_ORG_ID, PATH_USER_ID)
    })()
  }, [])

  /**
   * 获取业务详情
   */
  // const get_genreral_list = async () => {
  //   await gerneralInatance.gerneral_user_detail(path_user_id, path_org_id)
  // }

  return (
    <div className='sys_detail'>
      <Row className='header' justify='space-between'>
        <Col span={6}>
          <Button type='link' icon={<LeftOutlined />} onClick={() => props.history.goBack()}>
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
              <Item label='账号状态'>{is_inactive === 1 ? <Tag color='cyan'>封禁</Tag> : <Tag color='blue'>正常</Tag>}</Item>
              <Item label='手机号码'>{phone}</Item>
              <Item label='年龄'>{age ? age : <Tag color='cyan'>暂无数据</Tag>}</Item>
              <Item label='性别'>
                <Tag>{base.gender[parseFloat(`${gender}`)]}</Tag>
              </Item>
              <Item label='所在机构'>{title}</Item>
            </Descriptions>
          }
        </Col>
        <Col span={11}>
          <Descriptions title='身份'>
            <Item>
              {roles.map(item => (
                <Tag>{item}</Tag>
              ))}
            </Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  )
})

export default GerneralDetail
