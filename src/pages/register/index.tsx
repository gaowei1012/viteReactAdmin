import React from 'react'
import { Layout, Input, Button, Divider, Form } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import '../../styles/view-style/register.scss'

const Register: React.FC<any> = () => {
  const handleSubmit = () => {}
  return (
    <Layout className='register animated fadeIn'>
      <div className='model'>
        <div className='register-form'>
          <h3 style={{ textAlign: 'center' }}>viteReactAdmin</h3>
          <Divider />
          <Form onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{ message: '用户名不能为空', required: true }]}>
              <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入用户名' />
            </Form.Item>
            <Form.Item name='password' rules={[{ message: '密码不能为空', required: true }]}>
              <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='请输入密码' />
            </Form.Item>
            <Form.Item name='new_password' rules={[{ message: '密码不能为空', required: true }]}>
              <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='请再次输入密码' />
            </Form.Item>
            <Form.Item>
              <Button block type='primary' htmlType='submit'>
                注册
              </Button>
            </Form.Item>
            {/* <Form.Item noStyle>
              <a>已注册，请登录</a>
            </Form.Item> */}
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default Register
