import { ListBase } from './index'

interface ResidentAbstract {
  user_id: number
  username: string
  avatar_url: string
  name: string
  phone: string
  org_id: number
  title: string
  role_id: string
  roles: string
  is_inactive: number
  createdAt: string
  updatedAt: string
}

export interface ResidentDetail {
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
  is_inactive: number
  createdAt: string
  updatedAt: string
}

export type ResidentList = ListBase<ResidentAbstract>
