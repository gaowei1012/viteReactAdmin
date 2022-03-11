import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Modal, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { sysLevelOpt, businesLevelOpt } from '@/config/index'
import useResetFormOnCloseModal from '@/hooks/useResetFormOnCloseModal'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import '@/styles/view-style/roles.scss'
const { Option } = Select

type editRoleType = {
  role_id: number
  role: string
  type: string
  level: number
}

const EditRole: React.FC<{
  editRoleVisibled: boolean
  setEditRoleVisibled: any
}> = observer(props => {
  const { editRoleVisibled, setEditRoleVisibled } = props
  const [roleType, setRoleType] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [form] = Form.useForm()
  const { roleInatance } = useStore()

  const { role_id } = roleInatance.get_edit_state()

  useResetFormOnCloseModal({
    form,
    visible: editRoleVisibled,
  })

  useEffect(() => {
    ;(() => {
      const result: editRoleType = roleInatance.get_edit_state()
      setRoleType(result.type === '0' ? true : false)
      form.setFieldsValue(result)
    })()
  }, [editRoleVisibled])

  // 编辑确认
  const confrimRole = async () => {
    try {
      setConfirmLoading(true)
      const putRes = await form.validateFields()
      putRes['type'] = putRes['type']

      await roleInatance.put_role(role_id, putRes)
      setEditRoleVisibled(false)
      setConfirmLoading(false)
      await roleInatance.get_role_list(1, 20, {})
    } catch (e) {
      setConfirmLoading(false)
    }
  }

  /**
   * 选择角色类型的回调
   * @param e
   */
  const changeRolesType = (e: string) => {
    setRoleType(e === '0' ? true : false)
    if (e === '0') {
      form.setFieldsValue({ level: 9 })
    } else {
      form.resetFields(['level'])
    }
  }

  return (
    <Modal
      title='编辑角色'
      getContainer={false}
      visible={editRoleVisibled}
      width={630}
      onOk={confrimRole}
      onCancel={() => setEditRoleVisibled(false)}
      confirmLoading={confirmLoading}
      okText='确认编辑'
      // forceRender
    >
      <Form form={form}>
        <Form.Item label='角色名称' name='role' rules={[{ message: '请填写角色名称', required: true }]}>
          <Input style={{ width: 460 }} placeholder='请填写角色名称' />
        </Form.Item>
        <Form.Item label='角色类型' name='type' rules={[{ message: '请选择角色类型', required: true }]}>
          <Select onChange={changeRolesType} allowClear style={{ width: 460 }} placeholder='请选择角色类型'>
            <Option value={'0'}>业务角色</Option>
            <Option value={'1'}>系统角色</Option>
          </Select>
        </Form.Item>
        <Form.Item noStyle>
          <div className='level_selected_wrap'>
            <Tooltip title='角色层级提示'>
              <QuestionCircleOutlined className='circle__icon' />
            </Tooltip>
          </div>
          <Form.Item name='level' label='角色层级' rules={[{ message: '请选择角色层级', required: true }]}>
            <Select disabled={roleType} placeholder='请选择角色层级' style={{ width: 460 }}>
              {(!roleType ? sysLevelOpt : businesLevelOpt).map(level => (
                <Option value={level.level}>{level.levelName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default EditRole
