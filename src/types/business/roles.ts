import { ListBase } from './index'

export interface roleAbstract {
  role_id: number
  role: string
  type: number
  level: number
  createdAt: string
  updatedAt: string
}

export type RoleList = ListBase<roleAbstract>
