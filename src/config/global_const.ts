/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ListBase, OrgDetail, PersonalDetail, ResidentDetail, EmployeeDetail, Profile, InvitationPayload, OrgTreeNode, Permission } from '../interfaces/business'

export const EMPTY_ROWS: ListBase = { count: 0, rows: [] }

export const DEFAULT_ID: number = 0

export const DEFAULT_STRING: string = ''

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DEFAULT_ARRAY: any[] = []

export const DEFAULT_ORGDETAIL: OrgDetail = {
  org_id: DEFAULT_ID,
  parent_id: DEFAULT_ID,
  parent_title: DEFAULT_STRING,
  ancient: DEFAULT_STRING,
  title: DEFAULT_STRING,
  orgcode: DEFAULT_STRING,
  available: '0',
  orginfo_id: DEFAULT_ID,
  address: DEFAULT_STRING,
  phone: DEFAULT_STRING,
  gallery: DEFAULT_ARRAY,
  contacter: DEFAULT_STRING,
  depth: -1,
  createdAt: DEFAULT_STRING,
  updatedAt: DEFAULT_STRING,
}

export const DEFAULT_PERSONALDETAIL: PersonalDetail = {
  user_id: DEFAULT_ID,
  username: DEFAULT_STRING,
  avatar_url: DEFAULT_STRING,
  ssn: DEFAULT_STRING,
  birthday: DEFAULT_STRING,
  name: DEFAULT_STRING,
  phone: DEFAULT_STRING,
  age: DEFAULT_STRING,
  gender: DEFAULT_STRING,
  org_id: DEFAULT_ID,
  title: DEFAULT_STRING,
  role_id: DEFAULT_ARRAY,
  roles: DEFAULT_ARRAY,
  level: 99,
  is_freeze: 0,
  is_inactive: 0,
  createdAt: DEFAULT_STRING,
  updatedAt: DEFAULT_STRING,
  org_sys_list: DEFAULT_ARRAY,
  org_resi_list: DEFAULT_ARRAY,
}

export const DEFAULT_RESIDENTDETAIL: ResidentDetail = {
  user_id: DEFAULT_ID,
  username: DEFAULT_STRING,
  avatar_url: DEFAULT_STRING,
  name: DEFAULT_STRING,
  phone: DEFAULT_STRING,
  age: DEFAULT_STRING,
  gender: DEFAULT_STRING,
  org_id: DEFAULT_ID,
  title: DEFAULT_STRING,
  role_id: DEFAULT_ARRAY,
  roles: DEFAULT_ARRAY,
  is_inactive: 0,
  createdAt: DEFAULT_STRING,
  updatedAt: DEFAULT_STRING,
}

export const DEFAULT_EMPLOYEEDETAL: EmployeeDetail = {
  user_id: DEFAULT_ID,
  username: DEFAULT_STRING,
  avatar_url: DEFAULT_STRING,
  name: DEFAULT_STRING,
  phone: DEFAULT_STRING,
  age: DEFAULT_STRING,
  gender: DEFAULT_STRING,
  org_id: DEFAULT_ID,
  title: DEFAULT_STRING,
  role_id: DEFAULT_ARRAY,
  roles: DEFAULT_ARRAY,
  level: 99,
  is_freeze: 0,
  is_inactive: 0,
  createdAt: DEFAULT_STRING,
  updatedAt: DEFAULT_STRING,
}

export const DEFAULT_PROFILE: Profile = {
  user_id: DEFAULT_ID,
  username: DEFAULT_STRING,
  avatar_url: DEFAULT_STRING,
  createdAt: DEFAULT_STRING,
  updatedAt: DEFAULT_STRING,
  name: DEFAULT_STRING,
}

export const DEFAULT_PERMISSION: Permission = {
  ancient: DEFAULT_ARRAY,
  level: 99,
  org_id: DEFAULT_ID,
  parent_id: DEFAULT_ID,
  role: DEFAULT_STRING,
  role_id: DEFAULT_ID,
  title: DEFAULT_STRING,
}

export const DEFAULT_INVITATIONPAYLOAD: InvitationPayload = {
  user_id: DEFAULT_ID,
  org_id: DEFAULT_ID,
  org_name: DEFAULT_STRING,
  phone: DEFAULT_STRING,
  role_id: DEFAULT_ARRAY,
  name: DEFAULT_STRING,
  roles: DEFAULT_ARRAY,
  iat: 0,
  exp: 0,
}

export const DEFAULT_ORGTREENODE: OrgTreeNode = {
  org_id: DEFAULT_ID,
  parent_id: DEFAULT_ID,
  title: DEFAULT_STRING,
  available: '0',
  children: DEFAULT_ARRAY,
}
