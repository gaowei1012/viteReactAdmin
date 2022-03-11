import { Input, Row, Col, Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import SearchTree from '@/components/SearchTree'
import '@/styles/view-style/organization.scss'
import { useStore } from '@/hooks/useStore'
import UploadOrganize from './uploadOrganize'
import { observer } from 'mobx-react-lite'
import AddOrganize from './addOrganize'
import { useNavigate } from 'react-router-dom'

const Organization: React.FC<{}> = observer(() => {
  const [organizeVisibled, setOrganizeVisibled] = useState<boolean>(false)
  const [uploadVisibled, setUploadVisibled] = useState<boolean>(false)
  const [orgId, setOrgId] = useState<number>(0)
  const [changeValue, setChangeValue] = useState<any>(null)

  const { organizationInatance } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    get_org_list()
  }, [])

  /**
   * 获取组织机构列表
   */
  const get_org_list = async () => {
    await organizationInatance.get_organization()
  }

  /**
   * 组织机构详情
   * @param orgId 选择组织机构ID
   */
  const organizeDetail = (orgId: number) => {
    // navigate(`/organization/${orgId}`)
    navigate(`/organization/${orgId}`)
  }

  /**
   * 冻结/解冻组织机构
   * @param orgId 被冻结的组织ID
   */
  const freezeTree = async (orgId: number, available: string) => {
    Modal.confirm({
      title: `是否${available !== '0' ? '冻结' : '解冻'}该组织机构`,
      content: `${available !== '0' ? '确认该组织机构下没有用户，方可冻结此组织机构!' : '解冻后，可以添加用户即下属机构'}`,
      okText: `确认${available !== '0' ? '冻结' : '解冻'}`,
      cancelText: '取消',
      onOk: async () => {
        try {
          await organizationInatance.put_freeze_organization(orgId, { available: available == '0' ? '1' : '0' })
        } catch (err) {}
        get_org_list()
      },
    })
  }

  /**
   * 组织机构批量导入
   * @param orgId 组织机构ID
   */
  const uploadTree = (orgId: number) => {
    setOrgId(orgId)
    setUploadVisibled(true)
  }

  /**
   * 模糊查询
   * 前端本地查询
   */
  const searchOrg = (event: { target: { value: string } }) => {
    setChangeValue(event.target.value)
  }

  /**
   * 添加Tree
   * @param item
   */
  const addTree = (orgId: number) => {
    setOrgId(orgId)
    setOrganizeVisibled(true)
  }

  return (
    <div className='org_container'>
      <Row justify='space-around'>
        <Col span={18}></Col>
        <Col span={5}>
          <Input placeholder='组织机构筛选' type='text' onChange={searchOrg} />
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }} justify='center'>
        <Col span={23}>
          <SearchTree
            showRight
            addTree={addTree}
            uploadTree={uploadTree}
            freezeTree={freezeTree}
            organizeDetail={organizeDetail}
            filter={changeValue}
            data={organizationInatance.get_org_list_state()}
          />
        </Col>
      </Row>
      <AddOrganize organizeVisibled={organizeVisibled} setOrganizeVisibled={setOrganizeVisibled} orgId={orgId} getOrgList={get_org_list} />
      <UploadOrganize uploadVisibled={uploadVisibled} setUploadVisibled={setUploadVisibled} orgId={orgId} getOrgList={get_org_list} />
    </div>
  )
})

export default Organization
