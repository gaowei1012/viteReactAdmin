import React, { useState } from 'react'
import '@/styles/view-style/login.scss'
import LoginBg from '@/assets/images/login_bg.png'
import { UserOutlined, LockOutlined, FileProtectOutlined } from '@ant-design/icons'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'

const ForgetPass: React.FC<any> = props => {
  const [count, setCount] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { authorizationStoreInstance } = useStore()

  /**
   * 获取表单输入值
   * @param event 表单的回调值
   */
  const handleForgetPass = async (event: { phoneNumber: string; password: string; code: string }) => {
    if (event.phoneNumber && event.code && event.password) {
      await authorizationStoreInstance.forget_password(event)
      navigate('/login')
    } else {
      message.warning('必填字段不能为空!')
    }
  }

  /**
   * 获取验证码
   */
  const getOpt = async () => {
    try {
      if (form.getFieldValue('phoneNumber')) {
        const data: any = {
          phoneNumbers: [form.getFieldValue('phoneNumber')],
          type: 1, // 注意0找回密码1
        }
        await authorizationStoreInstance.get_opt(data)
        setDisabled(true)
        let initCount = 60
        const countDownInterval = setInterval(() => {
          setCount(--initCount)
          if (initCount == 0) {
            clearInterval(countDownInterval)
            setDisabled(false)
          }
        }, 1000)
      } else {
        message.warning('手机号码不能为空')
      }
    } catch (err) {}
  }

  /**
   * 跳转到登录
   */
  const immediately = () => {
    navigate('/login')
  }

  /**
   * 渲染找回密码输入框
   * @returns ReactNode
   */
  const forgotForm = () => {
    return (
      <Form form={form} onFinish={handleForgetPass} labelCol={{ span: 3 }}>
        <Form.Item rules={[{ required: true, message: '请输入手机号码' }]} className='form-item' name='phoneNumber' label='手机号'>
          <Input className='form-input' prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='tel' placeholder='请输入手机号码' maxLength={11} />
        </Form.Item>
        <Form.Item noStyle>
          <div className={`${disabled ? 'verification_active' : 'verification_nomal'} verification`} onClick={getOpt}>
            {disabled ? `${count}s` : '获取验证码'}
          </div>
          <Form.Item rules={[{ required: true, message: '请输入验证码' }]} className='form-item-count' name='code' label='验证码'>
            <Input className='form-input-count' prefix={<FileProtectOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='tel' placeholder='请输入验证码' maxLength={6} />
          </Form.Item>
        </Form.Item>
        <Form.Item rules={[{ required: true, message: '请输入密码' }]} className='form-item' name='password' label='密码'>
          <Input className='form-input' prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='请输入密码' />
        </Form.Item>
        <Form.Item className='form-item-btn'>
          <Button className='form-btn' block type='primary' htmlType='submit'>
            找回密码
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
          <div className='form_wrap'>{forgotForm()}</div>
          <span className='tip_text' onClick={immediately}>
            立即登录?
          </span>
        </div>
      </div>
    </div>
  )
}

export default ForgetPass
