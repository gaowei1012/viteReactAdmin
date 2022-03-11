/**
 * @interface localstorage中用户的profile信息
 */
export interface Profile {
  user_id: number
  username: string //账号 - 手机号
  createdAt: string
  updatedAt: string
  avatar_url: string
  name: string //真实姓名
}

/**
 * @interface localstorage中用户的permission信息
 */
export interface Permission {
  ancient: number[]
  level: number
  org_id: number
  parent_id: number
  role: string
  role_id: number
  title: string
}

/**
 * @interface 用户登录信息
 */
export interface LoginInfo {
  profile: Profile
  permission: Permission
}

/**
 * @interface 用户的系统角色
 */
interface OrgSysRoleDetail {
  org_id: number
  parent_id: number
  title: string
  org_available: string
  role_id: number
  role: string
  type: number
  is_freezed: number
}

/**
 * @interface 用户的业务角色
 */
interface OrgResiRoleDetail {
  org_id: number
  parent_id: number
  title: string
  org_available: string
  role_id: number
  role: string
  type: number
  is_inactive: number
}

export interface PersonalDetail {
  user_id: number
  username: string
  avatar_url: string
  ssn: string
  birthday: string
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
  org_sys_list: OrgSysRoleDetail[]
  org_resi_list: OrgResiRoleDetail[]
}
