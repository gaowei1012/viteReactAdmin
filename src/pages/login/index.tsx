import React from 'react'
import { Layout, Input, Button, Divider, Form } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import '../../styles/view-style/login.scss'

const Login: React.FC<any> = () => {
  const handleSubmit = () => {}
  return (
    <Layout className='login animated fadeIn'>
      <div className='model'>
        <div className='login-form'>
          <h3 style={{ textAlign: 'center' }}>viteReactAdmin</h3>
          <Divider />
          <Form onFinish={handleSubmit}>
            <Form.Item name='username' rules={[{ message: '用户名不能为空', required: true }]}>
              <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入用户名' />
            </Form.Item>
            <Form.Item name='password' rules={[{ message: '密码不能为空', required: true }]}>
              <Input prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='请输入密码' />
            </Form.Item>
            <Form.Item>
              <Button block type='primary' htmlType='submit'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  )
}

export default Login
