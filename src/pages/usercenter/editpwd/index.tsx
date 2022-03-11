import React, { useEffect } from 'react'
import { Form, Input, Modal, message, FormProps } from 'antd'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

const formLayout: FormProps = {
  labelCol: { span: 4 },
}

const EditUserPwd: React.FC<{
  editPwdVisible: boolean
  setEditPwdVisible: any
}> = observer(props => {
  const { editPwdVisible, setEditPwdVisible } = props
  const { profileInstance } = useStore()
  const [pwdForm] = Form.useForm()
  const navigate = useNavigate()

  useEffect(() => {
    pwdForm.resetFields()
  }, [editPwdVisible])

  /**
   * 校验编辑密码
   * @param rule 规则
   * @param value 响应值
   * @returns boolean
   */
  // const validator = async (rule: any, value: any) => {
  //   console.log(rule, value)
  //   await validatorUtils(rule, value)
  // }

  // 保存
  const comfirmPwd = () => {
    pwdForm
      .validateFields()
      .then(async (values: any) => {
        if (values.password === values.newpassword) {
          const data = {
            oldpassword: values.oldpassword,
            newpassword: values.newpassword,
          }
          await profileInstance.post_changepwd(data)
          setEditPwdVisible(false)
          // 修改成功后，跳转登录页面
          localStorage.clear()
          navigate(-1)
        } else {
          message.warn('两次输入新密码不一致，请重新输入!')
        }
      })
      .catch(info => {
        // console.log(info)
      })
  }
  return (
    <Modal
      getContainer={false}
      maskClosable={false}
      title='修改密码'
      visible={editPwdVisible}
      onCancel={() => {
        setEditPwdVisible(false)
      }}
      onOk={comfirmPwd}
      width={600}
    >
      <Form form={pwdForm} {...formLayout}>
        <Form.Item label='旧密码' name='oldpassword' rules={[{ required: true, message: '请输入旧密码' }]}>
          <Input.Password placeholder='请输入旧密码' />
        </Form.Item>
        <Form.Item label='新密码' name='password' rules={[{ required: true, message: '请输入新密码' }]}>
          <Input.Password placeholder='请输入新密码' />
        </Form.Item>
        <Form.Item label='确认密码' name='newpassword' rules={[{ required: true, message: '请再次输入新密码' }]}>
          <Input.Password placeholder='请再次输入新密码' />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default EditUserPwd
