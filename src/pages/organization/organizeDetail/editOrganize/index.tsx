import React, { useEffect, useState } from 'react'
import { Form, Input, TreeSelect, Modal, Upload } from 'antd'
import { useStore } from '@/hooks/useStore'
import { PlusOutlined } from '@ant-design/icons'
import { OrgTreeNode } from '@/types/business'
import { observer } from 'mobx-react-lite'
import { FormProps } from 'antd'
import _ from 'lodash'

const formLabel: FormProps = {
  labelCol: { span: 5 },
}

const { TreeNode } = TreeSelect

const EditOrganize: React.FC<{
  organizeVisibled: boolean
  setOrganizeVisibled: any
  ordId: number
}> = observer(props => {
  const { organizeVisibled, setOrganizeVisibled, ordId } = props
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const [filelist, setFileList] = useState<any>([])
  const { organizationInatance } = useStore()
  const { gallery, depth } = organizationInatance.get_org_detail_state()
  const [editForm] = Form.useForm()

  useEffect(() => {
    ;(async () => await organizationInatance.get_organization())()
  }, [])

  useEffect(() => {
    editForm.setFieldsValue(organizationInatance.get_org_detail_state())
    const urlList: any = []
    _.each(gallery, function (item) {
      urlList.push({
        url: item,
      })
    })
    setFileList(urlList)
  }, [organizeVisibled])

  /**
   * 确认编辑
   */
  const confirmEditOrganize = async () => {
    try {
      setConfirmLoading(true)
      const organize = await editForm.validateFields()
      const urllist = _.map(filelist, 'url')
      organize['gallery'] = JSON.stringify(urllist)
      await organizationInatance.put_organization(ordId, organize)
      await organizationInatance.get_organization_detail(ordId)
      setOrganizeVisibled(false)
      setConfirmLoading(false)
    } catch (e) {
      setConfirmLoading(false)
    }
  }

  /**
   * 取消编辑
   */
  const cancelOrganize = () => {
    setOrganizeVisibled(false)
  }

  // 上传图集
  const handleUpload = (option: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(option.file)
    reader.onloadend = async function (e: any) {
      const data = {
        data: e.target.result,
      }
      // 上传到阿里cos
      const galleryRes = await organizationInatance.post_org_gallery(data)
      // 合并之前的数据
      const orgFileList = [...filelist]
      orgFileList.push({ url: galleryRes })
      setFileList(orgFileList)
      if (e && e.target && e.target.result) {
        option.onSuccess()
      }
    }
  }

  // 删除头像
  const removeImg = (info: any) => {
    const remRes = _.pull(filelist, _.find(filelist, { uid: info.uid }))
    setFileList([...remRes])
  }

  /**
   * 编辑组织机构
   * 选择上级机构
   * 树节点
   * @param data tree数据
   * @returns
   */
  const renderTreeNode = (data: OrgTreeNode[]) => {
    if (data.length == 0) return
    return data.map((item: OrgTreeNode) => {
      const title = <span>{item.title}</span>
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode key={item.org_id} title={title} value={item.org_id}>
            {renderTreeNode(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.org_id} title={title} value={item.org_id} />
    })
  }

  return (
    <Modal visible={organizeVisibled} title='编辑组织机构' onOk={confirmEditOrganize} onCancel={cancelOrganize} confirmLoading={confirmLoading} okText='确认' width={650}>
      {depth >= 0 ? (
        <Form form={editForm} {...formLabel}>
          <Form.Item label='地址' name='address'>
            <Input placeholder='请输入详细地址' />
          </Form.Item>
          <Form.Item label='联系人' name='contacter'>
            <Input placeholder='请输入联系人' />
          </Form.Item>
          <Form.Item label='联系人手机号' name='phone'>
            <Input placeholder='请输入联系人手机号' type='tel' maxLength={11} />
          </Form.Item>

          <div style={{ display: depth >= 1 ? 'block' : 'none' }}>
            <Form.Item label='机构名称' name='title' rules={[{ required: true, message: '请输入机构名称' }]}>
              <Input placeholder='请输入机构名称' />
            </Form.Item>
            <Form.Item label='机构编码' name='orgcode' rules={[{ required: true, message: '请输入机构编码' }]}>
              <Input placeholder='请输入机构编码' />
            </Form.Item>
          </div>

          <div style={{ display: depth >= 2 ? 'block' : 'none' }}>
            <Form.Item label='选择上级机构' name='parent_id' rules={[{ required: true, message: '请选择上级机构' }]}>
              <TreeSelect treeDefaultExpandAll>{renderTreeNode(organizationInatance.get_org_list_state())}</TreeSelect>
            </Form.Item>
          </div>
          <Form.Item name='gallery' label='图集'>
            <Upload
              type='select'
              listType='picture-card'
              fileList={filelist}
              onRemove={removeImg}
              showUploadList={{
                showRemoveIcon: true,
                showPreviewIcon: false,
              }}
              maxCount={100}
              customRequest={handleUpload}
            >
              <PlusOutlined />
            </Upload>
          </Form.Item>
        </Form>
      ) : null}
    </Modal>
  )
})

export default EditOrganize
