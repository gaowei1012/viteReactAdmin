import React, { useState } from 'react'
import { Form, Input, Button, Result } from 'antd'
import '@/styles/view-style/login.scss'
import '@/styles/view-style/invitation.scss'
import { useStore } from '@/hooks/useStore'
import { inputsValidator } from '@/utils/validator'
import { observer } from 'mobx-react-lite'

export const Register: React.FC<any & { jwt: string }> = observer(props => {
  const { invitaionInstance, authorizationStoreInstance } = useStore()
  const { jwt } = props
  const [pageState, setPageState] = useState<'confirm' | 'default'>('default')
  const [count, setCount] = useState<number>(0)
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const { phone } = invitaionInstance.get_invitation_info()

  /**
   * 确认注册
   * @param event
   */
  const onFinish = async (event: any) => {
    const data: any = {
      jwt: jwt,
      ...event,
    }
    await invitaionInstance.post_invitation_register(data)
    setPageState('confirm')
  }

  /**
   * 获取验证码
   */
  const getOpt = async () => {
    setDisabled(true)
    try {
      inputsValidator.isIdentityCard(phone)
      const data: any = {
        phoneNumbers: [phone],
        type: 0, // 1找回密码、0注册
      }
      await authorizationStoreInstance.get_opt(data)
      let initCount = 60
      const countDownInterval = setInterval(() => {
        setCount(--initCount)
        if (initCount == 0) {
          setDisabled(false)
          clearInterval(countDownInterval)
        }
      }, 1000)
    } catch (err) {}
  }

  const registerPageRender = () => {
    switch (pageState) {
      case 'confirm':
        return <Result status='success' title='注册成功' subTitle='您已成功注册，可以登录系统!' />
      default:
        return (
          <Form onFinish={onFinish} layout='horizontal'>
            <Form.Item label='姓名' name='name' rules={[{ required: true, message: '请输入姓名' }]}>
              <Input type='text' placeholder='请输入姓名' />
            </Form.Item>
            <Form.Item
              label='身份证号码'
              name='ssn'
              rules={[
                {
                  validator: async (rule, value) => {
                    try {
                      inputsValidator.isIdentityCard(value)
                    } catch (err) {
                      await Promise.reject(err)
                    }
                  },
                },
              ]}
            >
              <Input type='text' placeholder='请输入身份证号码' />
            </Form.Item>
            <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder='请输入密码' />
            </Form.Item>

            <Form.Item label='验证码' name='code' rules={[{ required: true, message: '请输入验证码' }]}>
              <Form.Item>
                <Input type='text' style={{ width: 'calc(100% - 160px)' }} placeholder='请输入验证码' maxLength={6} />
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <Button type='primary' onClick={getOpt} disabled={isDisabled}>
                  {count == 0 ? '获取验证码' : `${count}秒后获取`}
                </Button>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button className='btn' block type='primary' htmlType='submit'>
                注册
              </Button>
            </Form.Item>
          </Form>
        )
    }
  }

  return <>{registerPageRender()}</>
})
