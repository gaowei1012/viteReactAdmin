import React, { useState, useEffect } from 'react'
import LoginBg from '@/assets/images/login_bg.png'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/hooks/useStore'
import { observer } from 'mobx-react-lite'
import { Button, Row, Col } from 'antd'
import '@/styles/view-style/login.scss'

const ChooseOrg: React.FC<any> = observer(() => {
  const [selectedOrgRole, setSelectedOrgRole] = useState<{ role_id: number; org_id: number }>({ role_id: 0, org_id: 0 })
  const { authorizationStoreInstance } = useStore()

  const navigate = useNavigate()

  useEffect(() => {
    getOrgroleList()
  }, [])
  /**
   * 获取组织机构列表
   */
  const getOrgroleList = async () => {
    await authorizationStoreInstance.get_orgrole_list()
  }
  /**
   * 选择组织机构
   */
  const handleOrg = async () => {
    await authorizationStoreInstance.select_orgrole(selectedOrgRole)
    navigate('/microservice')
  }

  const isSelected = (item: any) => {
    return selectedOrgRole.org_id === item.org_id && selectedOrgRole.role_id === item.role_id
  }

  const nothingSelected = () => {
    return selectedOrgRole.org_id === 0 && selectedOrgRole.role_id === 0
  }

  return (
    <div className='login_container'>
      <div className='left_flow' />
      <div className='content'>
        <img className='img' src={LoginBg} alt='logo' />
        <div className='right_flow'>
          <div className='title_flow'>
            <span className='h4'>欢迎使用，</span>
            <span className='h3_title'>养老管理平台</span>
          </div>
          <div className='form_wrap'>
            <div className='card_wrap'>
              <Row gutter={[20, 10]}>
                {authorizationStoreInstance.get_org_list_state().map(item => (
                  <Col span={8}>
                    {item.is_freezed === 1 ? (
                      <div className='freezed_card' key={`${item.org_id}-${item.role_id}`}>
                        <span className='freezed_title'>{item.title}</span>
                        <span className='freezed_description'>{item.role}</span>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setSelectedOrgRole({ role_id: item.role_id, org_id: item.org_id })
                        }}
                        className={`${isSelected(item) ? 'card_active' : 'card_nomal'} card`}
                        key={`${item.org_id}-${item.role_id}`}
                      >
                        <span className={`${isSelected(item) ? 'title' : 'title_nomal'}`}>{item.title}</span>
                        <span className={`${isSelected(item) ? 'description' : 'description_nomal'}`}>{item.role}</span>
                      </div>
                    )}
                  </Col>
                ))}
              </Row>
            </div>
            <div className='btn-wrap'>
              <Button disabled={nothingSelected()} className={`${nothingSelected() ? 'btn-disabled' : 'btn'}`} onClick={handleOrg}>
                选择机构角色
              </Button>
              <Button className='btn-default' onClick={() => navigate('/login')}>
                返回登录页
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ChooseOrg
