/*
 * @Author: weiqi
 * @Date: 2022-01-21 11:18:14
 * @LastEditors: weiqi
 * @LastEditTime: 2022-02-24 13:17:27
 * @Description: file content
 * @FilePath: /yl-cms/frontend/ms-userorg/src/interfaces/business/employee.ts
 */
import { ListBase } from './index'

export interface EmployeeDetail {
  user_id: number
  username: string
  avatar_url: string
  name: string
  phone: string
  age: string
  gender: string
  org_id: number
  title: string
  role_id: number[] //后续更改需要变为number[]
  roles: string[] //后续更改需要变为string[]
  level: number
  is_freeze: number
  is_inactive: number
  createdAt: string
  updatedAt: string
}

interface EmployeeAbstract {
  user_id: number
  phone: string
  avatar_url: string
  org_id: number
  is_freeze: number
  roles: string
  name: string
  createdAt: string
  updatedAt: string
}

interface IdleAbstract {
  user_id: number
  name: string
  phone: string
  avatar_url: string
  org_id: number | null
  roles: string | null
  createdAt: string
  updatedAt: string
}

export type InvitationPayload = {
  user_id?: number
  org_id: number
  org_name: string
  phone: string
  role_id: number[]
  name: string
  roles: {
    role: string
    type: number
    level: number
  }[]
  iat: number
  exp: number
}

export type InvitationPendingAbstract = {
  org_id: number
  phone: string
  name: string
  roles: {
    role: string
    type: number
    level: number
  }[]
  exp: number
  url: string
}

export type EmployeeList = ListBase<EmployeeAbstract>

export type IdleList = ListBase<IdleAbstract>
