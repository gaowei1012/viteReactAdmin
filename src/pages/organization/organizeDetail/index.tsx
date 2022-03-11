import React, { useEffect, useState } from 'react'
import { Button, Descriptions, Row, Col, Tag, Image, Divider } from 'antd'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import '@/styles/view-style/organization.scss'
import { useStore } from '@/hooks/useStore'
import EditOrganize from './editOrganize'
import { observer } from 'mobx-react-lite'

const { Item } = Descriptions

const OrganizeDetail: React.FC<{}> = observer(props => {
  const [organizeVisibled, setOrganizeVisibled] = useState<boolean>(false)
  const { organizationInatance } = useStore()
  const { contacter, address, phone, gallery, title, parent_title, orgcode, available } = organizationInatance.get_org_detail_state()
  const navigate = useNavigate()
  const params: any = useParams()

  const PATH_ORG_id = parseInt(params.id)

  useEffect(() => {
    ;(async () => await organizationInatance.get_organization_detail(PATH_ORG_id))()
  }, [])

  return (
    <div className='organize_detail'>
      <Row className='header' justify='space-between'>
        <Col span={6}>
          <Button type='link' icon={<LeftOutlined />} onClick={() => navigate(-1)}>
            返回
          </Button>
        </Col>
        <Col span={6}>
          <EditOutlined className='edit' onClick={() => setOrganizeVisibled(true)} />
        </Col>
      </Row>
      <Row style={{ marginTop: 60 }} justify='center'>
        <Col span={23}>
          <Descriptions column={{ md: 2 }} title='基本信息'>
            <Item label='联系人'>{contacter ? <>{contacter}</> : <Tag color='gold'>暂无数据</Tag>}</Item>
            <Item label='地址'>{address ? <>{address}</> : <Tag color='gold'>暂无数据</Tag>}</Item>
            <Item label='手机号'>{phone ? <>{phone}</> : <Tag color='gold'>暂无数据</Tag>}</Item>
            <Item label='图集'>{gallery.length !== 0 ? gallery.map(item => <Image width={80} src={item} />) : <Tag color='gold'>暂无图集</Tag>}</Item>
          </Descriptions>
          <Divider />
          <Descriptions column={{ md: 2 }} title='机构信息'>
            <Item label='组织机构名称'>{title ? <>{title}</> : <Tag color='cyan'>暂无数据</Tag>}</Item>
            <Item label='上级机构'>{parent_title ? <>{parent_title}</> : <Tag color='cyan'>暂无数据</Tag>}</Item>
            <Item label='机构编码'>{orgcode ? <>{orgcode}</> : <Tag color='cyan'>暂无数据</Tag>}</Item>
            <Item label='机构状态'>{available === '0' ? <Tag color='green'>冻结</Tag> : <Tag color='blue'>正常</Tag>}</Item>
          </Descriptions>
        </Col>
      </Row>
      <EditOrganize setOrganizeVisibled={setOrganizeVisibled} organizeVisibled={organizeVisibled} ordId={PATH_ORG_id} />
    </div>
  )
})

export default OrganizeDetail
