import React from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Form, Input, Button, message } from 'antd'
import LoginBg from '@/assets/images/login_bg.png'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import '@/styles/view-style/login.scss'

const Login: React.FC<{}> = () => {
  const { authorizationStoreInstance } = useStore()
  const navigate = useNavigate()
  /**
   * 登录
   * @param event 表单返回值
   */
  const handleSubmit = async (event: any) => {
    if (event.phone !== undefined || event.password !== undefined) {
      await authorizationStoreInstance.login(event)
      navigate('/chooseorg')
    } else {
      message.warning('必填字段不能为空')
    }
  }

  /**
   * 跳转忘记密码
   */
  const forgotPass = () => {
    navigate('/forgot')
  }

  /**
   * 渲染登录表单输入框
   * @returns ReactNode
   */
  const loginForm = () => {
    return (
      <Form onFinish={handleSubmit} labelCol={{ span: 3 }}>
        <Form.Item rules={[{ required: true, message: '请输入手机号码' }]} className='form-item' name='username' label='手机号'>
          <Input className='form-input' prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='tel' placeholder='请输入手机号码' maxLength={11} />
        </Form.Item>
        <Form.Item rules={[{ required: true, message: '请输入密码' }]} className='form-item' name='password' label='密码'>
          <Input.Password className='form-input' prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='请输入密码' />
        </Form.Item>
        <Form.Item className='form-item-btn'>
          <Button id='test-form-btn' className='form-btn' block type='primary' htmlType='submit'>
            立即登录
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className='login_container'>
      <div className='left_flow' />
      <div className='content'>
        <img className='img' src={LoginBg} alt='logo' />
        <div className='right_flow'>
          <div className='title_flow'>
            <span className='h4'>欢迎使用，</span>
            <span className='h3_title'>养老管理平台</span>
          </div>
          <div className='form_wrap'>{loginForm()}</div>
          <span className='tip_text' onClick={forgotPass}>
            忘记密码?
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
