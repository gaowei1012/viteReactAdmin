import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Upload, Select } from 'antd'
import { useStore } from '@/hooks/useStore'
import { PlusOutlined } from '@ant-design/icons'
import { base } from '@/config/index'
import { validatorUtils } from '@/utils/validator/validator'
import { FormProps } from 'antd'
const { Option }: any = Select

const formLayout: FormProps = {
  labelCol: { span: 4 },
}
const EditProfile: React.FC<{
  editProfileVisible: boolean
  setEditProfileVisible: any
}> = props => {
  const { editProfileVisible, setEditProfileVisible } = props
  const [filelist, setFileList] = useState<any>([])
  const { profileInstance, authorizationStoreInstance } = useStore()
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [profileForm] = Form.useForm()

  useEffect(() => {
    setFileList([{ url: profileInstance.get_profile_state().avatar_url }])
    profileForm.setFieldsValue(profileInstance.get_profile_state())
  }, [editProfileVisible])

  /**
   * 校验编辑用户信息必填字段
   * @param rule
   * @param value
   * @return boolean
   */
  const validator = async (rule: any, value: any) => {
    await validatorUtils(rule, value)
  }

  /**
   * 更新用户信息
   */
  const comfirmEditProfile = async () => {
    try {
      setConfirmLoading(true)
      const values = await profileForm.validateFields()
      delete values.avatar_url
      values['avatar_url'] = filelist ? filelist[0].url : null
      await profileInstance.put_information(values)
      await profileInstance.get_information()
      authorizationStoreInstance.sync_login_profile(profileInstance.get_profile_state())
      setEditProfileVisible(false)
      setConfirmLoading(false)
    } catch (err) {
      setConfirmLoading(false)
    }
  }

  // 上传头像
  const handleUpload = (option: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(option.file)
    reader.onloadend = async function (e: any) {
      const data = {
        data: e.target.result,
      }
      const result: any = await profileInstance.post_avatar(data)
      profileForm.setFieldsValue({ img: result })
      setFileList([{ url: result }])
      if (e && e.target && e.target.result) {
        option.onSuccess()
      }
    }
  }

  // 删除头像
  const removeImg = () => {
    setFileList([])
  }

  return (
    <Modal
      getContainer={false}
      maskClosable={false}
      title='编辑个人信息'
      visible={editProfileVisible}
      onCancel={() => {
        setEditProfileVisible(false)
      }}
      onOk={comfirmEditProfile}
      confirmLoading={confirmLoading}
      width={600}
    >
      <Form {...formLayout} form={profileForm}>
        <Form.Item label='姓名' name='name' rules={[{ message: '请输入姓名', required: true, validator: validator }]}>
          <Input placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item label='性别' name='gender'>
          <Select placeholder='请选择性别'>
            {base.gender.map((item, index) => (
              <Option value={`${index}`} key={index}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='avatar_url' label='用户头像'>
          <Upload
            type='select'
            listType='picture-card'
            fileList={filelist}
            onRemove={removeImg}
            showUploadList={{
              showRemoveIcon: true,
              showPreviewIcon: false,
            }}
            maxCount={1}
            customRequest={handleUpload}
          >
            <PlusOutlined />
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditProfile
