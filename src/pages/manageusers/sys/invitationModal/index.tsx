import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { inputsValidator } from '@/utils'
const { Option } = Select

interface InvitedProps {
  visibled: boolean
  setVisibled: any
  orgId: number
}

const Invited: React.FC<InvitedProps> = observer(props => {
  const { visibled, setVisibled, orgId } = props
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { roleInatance, employeeInatance, exployeeListInstance, authorizationStoreInstance } = useStore()
  const { rows } = roleInatance.get_role_list_state()
  const [invitedFrom] = Form.useForm()
  const { permission } = authorizationStoreInstance.get_login_state()

  useEffect(() => {
    get_dropdown_roles()
  }, [orgId])

  /**
   * 获取权限类型
   */
  const get_dropdown_roles = async () => {
    const rolelist_query = permission.org_id == orgId ? { type: '1', level: { type: 'gt', value: permission.level } } : { type: '1' }
    await roleInatance.get_role_list(1, 50, rolelist_query)
  }

  /**
   * 关闭弹窗
   */
  const cancelInvited = () => {
    setVisibled(false)
  }

  /**
   * 确认邀请
   */
  const confirmInvited = async () => {
    try {
      setConfirmLoading(true)
      const invitedData = await invitedFrom.validateFields()
      const data = {
        org_id: orgId,
        ...invitedData,
      }
      await employeeInatance.post_employee_invitation(data)
      setVisibled(false)
      setConfirmLoading(false)
      exployeeListInstance.request_pending_employee_list(orgId)
    } catch (e) {
      setConfirmLoading(false)
    }
  }

  return (
    <Modal visible={visibled} title='邀请新用户' okText='确认邀请' cancelText='取消' width={600} onCancel={cancelInvited} onOk={confirmInvited} maskClosable={false} confirmLoading={confirmLoading}>
      <Form form={invitedFrom} labelCol={{ span: 5 }}>
        <Form.Item
          label='用户手机号'
          name='phone'
          initialValue={''}
          rules={[
            {
              validator: async (rule, value) => {
                try {
                  inputsValidator.isMobilePhone(value)
                } catch (err) {
                  await Promise.reject(err)
                }
              },
            },
          ]}
        >
          <Input placeholder='请输入被邀请人手机号' type='tel' maxLength={11} />
        </Form.Item>
        <Form.Item label='选择角色' name='role_id' rules={[{ required: true, message: '请选择角色' }]}>
          <Select mode='multiple' placeholder='请选择角色'>
            {rows.map((item: { role_id: number; role: string }) => (
              <Option key={item.role_id} value={item.role_id}>
                {item.role}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default Invited
