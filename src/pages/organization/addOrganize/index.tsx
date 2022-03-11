import React, { useEffect, useState } from 'react'
import { Modal, Input, Form, FormProps } from 'antd'
import { useStore } from '@/hooks/useStore'

const formLabel: FormProps = {
  labelCol: { span: 5 },
}

const AddOrganize: React.FC<{
  getOrgList: any
  setOrganizeVisibled: any
  organizeVisibled: boolean
  orgId: number
}> = props => {
  const { organizeVisibled, setOrganizeVisibled, orgId, getOrgList } = props
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [agencyForm] = Form.useForm()
  const { organizationInatance } = useStore()

  useEffect(() => {
    agencyForm.resetFields()
  }, [organizeVisibled])

  /**
   * 添加确认
   */
  const confirmOrg = async () => {
    try {
      setConfirmLoading(true)
      const orgData = await agencyForm.validateFields()
      const data: any = {
        org_id: orgId,
        ...orgData,
      }
      await organizationInatance.add_children_org(data)
      // 树下列表
      getOrgList()
      setOrganizeVisibled(false)
      setConfirmLoading(false)
    } catch (e) {
      setConfirmLoading(false)
    }
  }

  /**
   * 取消
   */
  const cancelAgency = () => {
    setOrganizeVisibled(false)
  }

  return (
    <Modal visible={organizeVisibled} title='添加下级机构' okText='添加' cancelText='取消' onOk={confirmOrg} width={600} onCancel={cancelAgency} confirmLoading={confirmLoading}>
      <Form form={agencyForm} {...formLabel}>
        <Form.Item label='组织机构名称' name='title' rules={[{ required: true, message: '请输入机构名称' }]}>
          <Input placeholder='请填写机构名称' />
        </Form.Item>
        <Form.Item label='机构编码' name='orgcode' rules={[{ required: true, message: '请填写机构编码' }]}>
          <Input placeholder='请填写机构编码' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddOrganize
