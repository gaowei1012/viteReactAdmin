import React from 'react'
import { Card, Button, Row, Col } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import '@/styles/view-style/microservice.scss'
import { useNavigate } from 'react-router-dom'

const Microservice: React.FC<any> = props => {
  const navigate = useNavigate()

  return (
    <div className='microservice'>
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Button
            icon={<LeftOutlined />}
            onClick={() => {
              navigate('/chooseorg')
            }}
          >
            返回角色选择
          </Button>
        </Col>
        {/* <Row> */}
        <Col span={8}>
          <Card
            className='card__wrap'
            bordered
            hoverable
            onClick={() => {
              // navigate('/user/sys')
              navigate('/roles')
            }}
            cover={
              //   <div style={{ width: '300px', margin: 'auto' }}>
              <img alt='example' src='https://yl-1303111169.cos.ap-nanjing.myqcloud.com/default/default.jpg' style={{ border: '1px solid #f0f0f0' }} />
              //   </div>
            }
          >
            <Card.Meta title='组织机构用户管理' description='包含组织机构管理,用户管理,角色管理，允许管理员通过该服务调整组织机构结构，管理员工权限等' />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className='card__wrap'
            onClick={() => {
              window.location.href = process.env.REACT_APP_MODE === 'docker' ? 'https://yl.qwd-tech.com/questionnaire/#/questionaire' : 'http://localhost:6003/#/questionaire'
            }}
            bordered
            hoverable
            cover={
              //   <div style={{ width: '300px', margin: 'auto' }}>
              <img alt='example' src='https://yl-1303111169.cos.ap-nanjing.myqcloud.com/default/default.jpg' style={{ border: '1px solid #f0f0f0' }} />
              //   </div>
            }
          >
            <Card.Meta title='问卷管理' description='对组织机构问卷发布进行管理，包括问卷管理和模板管理两大模块' />
          </Card>
        </Col>
        {/* </Row> */}
      </Row>
    </div>
  )
}

export default Microservice
