import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider, Row, Col, Descriptions, Tag, Statistic, Card, Badge } from 'antd'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { base } from '@/config/index'
import EditInformation from '../editprofile'
import _ from 'lodash'

export const Profile: React.FC<any> = observer(() => {
  const [editProfileVisible, setEditProfileVisible] = useState<boolean>(false)
  const { profileInstance } = useStore()
  const { avatar_url, name, ssn, phone, age, gender, birthday, org_resi_list, org_sys_list } = profileInstance.get_profile_state()
  useEffect(() => {
    profileInstance.get_information()
  }, [])

  const badgeStyle = (is_freeze: number) => {
    if (!is_freeze)
      return {
        color: 'green',
        text: <span style={{ padding: '1px 15px 10px 15px' }}>正常</span>,
      }
    else
      return {
        color: 'red',
        text: <span style={{ padding: '1px 15px 10px 15px' }}>冻结</span>,
      }
  }
  return (
    <React.Fragment>
      <Row>
        <Col span={5}>
          <Row gutter={[24, 18]} style={{ textAlign: 'center' }}>
            <Col span={24}>
              <Avatar size={100} src={avatar_url} />
            </Col>
            <Col span={24}>
              <Button
                onClick={() => {
                  setEditProfileVisible(true)
                }}
                type='ghost'
                size='middle'
              >
                编辑
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={18} offset={1}>
          <Descriptions title={name}>
            <Descriptions.Item label='性别'>
              <Tag color='blue'>{base.gender[parseFloat(`${gender}`)]}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label='年龄'>{age ? <Tag color='blue'>{age}</Tag> : <Tag>暂无数据</Tag>}</Descriptions.Item>
            <Descriptions.Item label='身份证'>{ssn}</Descriptions.Item>
            <Descriptions.Item label='生日'>{birthday}</Descriptions.Item>
            <Descriptions.Item label='手机号码'>{phone}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[24, 18]}>
        {_.map([...org_resi_list, ...org_sys_list], item => {
          return (
            <Col key={item.org_id} span={8}>
              <Badge.Ribbon {...badgeStyle((item as any).is_freezed)}>
                <Card>
                  <Statistic title={item.title} value={item.role} />
                </Card>
              </Badge.Ribbon>
            </Col>
          )
        })}
      </Row>
      <EditInformation editProfileVisible={editProfileVisible} setEditProfileVisible={setEditProfileVisible} />
    </React.Fragment>
  )
})
