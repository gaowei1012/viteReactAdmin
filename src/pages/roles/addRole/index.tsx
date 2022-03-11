import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Modal, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { sysLevelOpt, businesLevelOpt } from '@/config/index'
import useResetFormOnCloseModal from '@/hooks/useResetFormOnCloseModal'
import { useStore } from '@/hooks/useStore'
import '@/styles/view-style/roles.scss'
const { Option } = Select

const AddRole: React.FC<{
  addRoleVisibled: boolean
  setAddRoleVisibled: any
}> = props => {
  const { addRoleVisibled, setAddRoleVisibled } = props
  const [roleType, setRoleType] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { roleInatance } = useStore()
  const [addForm] = Form.useForm()

  useResetFormOnCloseModal({
    form: addForm,
    visible: addRoleVisibled,
  })

  useEffect(() => {
    if (addRoleVisibled) {
      addForm.resetFields()
    }
  }, [addRoleVisibled])

  // 添加确认
  const confrimRole = async () => {
    try {
      setConfirmLoading(true)
      const postRes: any = await addForm.validateFields()
      postRes['type'] = parseInt(postRes['type'])
      await roleInatance.post_role(postRes)
      setConfirmLoading(false)
      setAddRoleVisibled(false)
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
    setRoleType(e == '0' ? true : false)
    if (e == '0') {
      addForm.setFieldsValue({ level: 9 })
    } else {
      addForm.resetFields(['level'])
    }
  }

  return (
    <Modal
      title='添加角色'
      visible={addRoleVisibled}
      width={630}
      onOk={confrimRole}
      onCancel={() => {
        setAddRoleVisibled(false)
      }}
      confirmLoading={confirmLoading}
      // forceRender
    >
      <Form form={addForm}>
        <Form.Item label='角色名称' name='role' rules={[{ message: '请填写角色名称', required: true }]}>
          <Input style={{ width: 460 }} placeholder='请填写角色名称' />
        </Form.Item>
        <Form.Item label='角色类型' name='type' rules={[{ message: '请选择角色类型', required: true }]}>
          <Select onChange={changeRolesType} allowClear style={{ width: 460 }} placeholder='请选择角色类型'>
            <Option key={'0'}>业务角色</Option>
            <Option key={'1'}>系统角色</Option>
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
              {(!roleType ? sysLevelOpt : businesLevelOpt).map((level, idx) => (
                <Option key={`${level.level}-${idx}`} value={level.level}>
                  {level.levelName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddRole
