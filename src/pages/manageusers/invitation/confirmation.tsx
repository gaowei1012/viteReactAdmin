import React, { useState } from 'react'
import { Form, Input, Button, Result, message } from 'antd'
import '@/styles/view-style/invitation.scss'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import validator from 'validator'

export const Confirmation: React.FC<any & { jwt: string }> = observer(props => {
  const { invitaionInstance, authorizationStoreInstance } = useStore()
  const { jwt } = props
  const [pageState, setPageState] = useState<'confirm' | 'reject' | 'default'>('default')
  const [count, setCount] = useState<number>(0)
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const { phone } = invitaionInstance.get_invitation_info()
  const [form] = Form.useForm()

  /**
   * 确认邀请
   */
  const confirm = async () => {
    if (!form.getFieldsValue().code) {
      message.warning('验证码不能为空')
    } else {
      const data: any = {
        jwt: jwt,
        accept: 1,
        code: form.getFieldsValue().code,
      }

      await invitaionInstance.post_invitation_notarize(data)
      setPageState('confirm')
    }
  }

  /**
   * 邀请拒绝
   */
  const reject = async () => {
    if (!form.getFieldsValue().code) {
      message.warning('验证码不能为空')
    } else {
      const data: any = {
        jwt: jwt,
        accept: 0,
        code: form.getFieldsValue().code,
      }

      await invitaionInstance.post_invitation_notarize(data)
      setPageState('reject')
    }
  }
  /**
   * 获取验证码
   */
  const getOpt = async () => {
    setDisabled(true)
    try {
      if (validator.isEmpty(phone) || !validator.isMobilePhone(phone, 'zh-CN')) {
        message.warning('手机号码不能为空')
      } else {
        const data: any = {
          phoneNumbers: [phone],
          type: 1, // 1找回密码、0注册
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
      }
    } catch (err) {}
  }

  const confirmationPageRender = () => {
    switch (pageState) {
      case 'confirm':
        return <Result status='success' title='接受邀请' subTitle='接受邀请，可以作为系统用户登录!' />

      case 'reject':
        return <Result status='error' title='拒绝邀请' subTitle='拒绝邀请，将不能作为系统用户登录!' />

      default:
        return (
          <>
            <div className='btn-wrap'>
              <Form form={form} layout='horizontal'>
                <Form.Item name='code' rules={[{ required: true, message: '请输入验证码' }]}>
                  <Form.Item>
                    <Input type='text' style={{ width: 'calc(100% - 140px)' }} placeholder='请输入验证码' maxLength={6} />
                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                    <Button type='primary' onClick={getOpt} disabled={isDisabled}>
                      {count == 0 ? '获取验证码' : `${count}秒后获取`}
                    </Button>
                  </Form.Item>
                </Form.Item>
              </Form>

              <Button style={{ marginBottom: 20, height: 36 }} block onClick={confirm} type='primary'>
                接受邀请
              </Button>
              <Button style={{ height: 36 }} block onClick={reject} type='primary' danger>
                拒绝邀请
              </Button>
            </div>
          </>
        )
    }
  }

  return <>{confirmationPageRender()}</>
})
