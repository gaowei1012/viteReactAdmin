/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { List, Button, Divider } from 'antd'
import { observer } from 'mobx-react-lite'

import EditUserPwd from '../editpwd'

export const Security: React.FC<any> = observer(props => {
  const [editPwdVisible, setEditPwdVisible] = useState<boolean>(false)
  const listData = [
    {
      title: '账户密码',
      description: '当前密码强度:中等',
      action: [
        <Button
          onClick={() => {
            setEditPwdVisible(true)
          }}
          type='link'
        >
          修改密码
        </Button>,
      ],
    },
  ]
  return (
    <React.Fragment>
      <h3>账号安全</h3>
      <Divider />
      <List
        itemLayout='horizontal'
        dataSource={listData}
        renderItem={item => (
          <List.Item actions={item.action}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
      <EditUserPwd setEditPwdVisible={setEditPwdVisible} editPwdVisible={editPwdVisible} />
    </React.Fragment>
  )
})
