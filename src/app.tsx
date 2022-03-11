import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '@/containers/DefaultLayout'

import Gerneral from '@/pages/manageusers/gerneral'
import SysUser from '@/pages/manageusers/sys'
import Leave from '@/pages/manageusers/leave'
import Organization from '@/pages/organization'
import OrganizeDetail from '@/pages/organization/organizeDetail'
import Roles from '@/pages/roles'
import Login from '@/pages/users/login'
import ForgetPass from '@/pages/users/forgetPass'
import ChooseOrg from '@/pages/users/fhooseOrg'
import Microservice from '@/pages/microservice'
import UserCenter from '@/pages/usercenter'

import '@/styles/app.scss'
import '@/styles/base.scss'

const App: React.FC<any> = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/forgot' element={<ForgetPass />} />
      <Route path='/chooseorg' element={<ChooseOrg />} />
      <Route path='/microservice' element={<Microservice />} />
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/user/sys/:id' element={<SysUser />} />
        <Route path='/user/general/:org_id/:user_id' element={<Gerneral />} />
        <Route path='/user/leave' element={<Leave />} />
        <Route path='/organization' element={<Organization />} />
        <Route path='/organization/:id' element={<OrganizeDetail />} />
        <Route path='/roles' element={<Roles />} />
        <Route path='/usercenter' element={<UserCenter />} />
      </Route>
    </Routes>
  )
}

export default App
