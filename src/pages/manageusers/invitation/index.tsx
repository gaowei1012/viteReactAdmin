import React, { useEffect, useState } from 'react'
import { Confirmation } from './confirmation'
import '@/styles/view-style/invitation.scss'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { Register } from './register'
import { Image, Alert } from 'antd'
import moment from 'moment'

export const Invitation: React.FC<any> = observer(props => {
  const { invitaionInstance } = useStore()
  const [pageState, setPageState] = useState<'register' | 'confirmation' | 'default'>('default')
  const { name, roles, org_name, iat, phone } = invitaionInstance.get_invitation_info()
  const TOKEN_PATH = props.location.pathname.split('/')[2]
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      await invitaionInstance.request__invitation_payload(TOKEN_PATH)
      !invitaionInstance.get_invitation_info().user_id ? setPageState('register') : setPageState('confirmation')
    })()
  }, [])

  const invitationPageRender = () => {
    switch (pageState) {
      case 'register':
        return <Register jwt={TOKEN_PATH} {...props} />
      case 'confirmation':
        return <Confirmation jwt={TOKEN_PATH} {...props} />
      default:
        return <></>
    }
  }

  return (
    <div className='invitation'>
      <Alert message='请确认您的手机号' type='warning' description={phone} showIcon closable />

      <Image width={100} preview={false} src='https://yl-1303111169.cos.ap-nanjing.myqcloud.com/default/logo.png' style={{ marginTop: 40, marginLeft: 40 }} />
      <p className='invitation_title'>【{org_name}】任职邀请</p>
      <div className='content'>{invitationPageRender()}</div>
      <div className='desc'>
        <div className='item'>
          <span className='left'>发送邀请人:</span>
          <span className='right'>{name}</span>
        </div>
        <div className='item'>
          <span className='left'>邀请职务:</span>
          {roles.map((item: any) => (
            <span className='right'>{item.role}</span>
          ))}
        </div>
        <div className='item'>
          <span className='left'>邀请时间:</span>
          <span className='right'>{moment(iat).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
      </div>
    </div>
  )
})
