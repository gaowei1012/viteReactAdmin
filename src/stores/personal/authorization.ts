import { observable, makeObservable, toJS } from 'mobx'
import { AuthorizationRequest } from '@/services/apis'
import { Profile, OrgRoleAbstract, LoginInfo, Permission } from '@/types/business'
import { DEFAULT_PROFILE, DEFAULT_PERMISSION } from '@/config/index'
import { MessageUtils } from '@/utils'

export class AuthorizationStore {
  login_result: LoginInfo = { profile: DEFAULT_PROFILE, permission: DEFAULT_PERMISSION }
  auth_class: string[] = []
  org_list: OrgRoleAbstract[] = []

  constructor() {
    makeObservable(this, {
      login_result: observable,
      auth_class: observable,
      org_list: observable,
    })

    // 登录状态持久化
    if (this.login_result.profile.user_id === 0) {
      const data: any = localStorage.getItem('loginState')
      if (data) this.login_result = JSON.parse(data)
    }
    // 持久化可访问权限class
    if (this.auth_class.length === 0) {
      const data: any = localStorage.getItem('authClass')
      if (data) this.auth_class = JSON.parse(data)
    }
  }

  sync_login_profile(profile: Profile) {
    this.login_result.profile = profile
    localStorage.setItem('loginState', JSON.stringify(this.login_result))
  }

  sync_login_permission(permission: Permission) {
    this.login_result.permission = permission
    localStorage.setItem('loginState', JSON.stringify(this.login_result))
  }

  // 登录
  async login(data: { username: string; password: string }) {
    const loginInfo = await AuthorizationRequest.post_login(data)
    this.sync_login_profile(loginInfo.data.profile)
    MessageUtils.MsgSuccess(loginInfo.message)
  }

  // 获取可访问全Class权限
  get_auth_class() {
    // TODO
  }

  // 获取用户所属组织机构角色列表
  async get_orgrole_list() {
    const roleInfo = await AuthorizationRequest.get_orgrole_list()
    this.org_list = roleInfo.data
  }

  // 选择用户登入系统的组织机构角色
  async select_orgrole(data: { org_id: number; role_id: number }) {
    const selectedrole = await AuthorizationRequest.post_selectrole(data)
    this.sync_login_permission(selectedrole.data.permission)
  }

  // 登录
  async logout() {
    await AuthorizationRequest.post_logout()
  }

  /**
   * 忘记密码
   * @param data
   * @returns
   */
  async forget_password(data: { phoneNumber: string; password: string; code: string }) {
    MessageUtils.MsgSuccess((await AuthorizationRequest.forget_password(data)).message)
  }

  /**
   * 找回密码， 发送验证码
   * @param data
   */
  async get_opt(data: { phoneNumbers: string; type: number }) {
    // const getOptRes = await AuthorizationRequest.get_opt(data)
    // MessageUtils.MsgSuccess(`${getOptRes.message}:${JSON.stringify(getOptRes.data)}`)
    MessageUtils.MsgSuccess((await AuthorizationRequest.get_opt(data)).message)
  }

  /**
   * 处理toJS(this.login_result)
   * @returns login_result
   */
  get_login_state() {
    return toJS(this.login_result)
  }

  /**
   * 处理toJS(this.auth_class)
   * @returns auth_class
   */
  get_auth_class_state() {
    return toJS(this.auth_class)
  }

  /**
   * 处理toJS(this.org_list)
   * @returns org_list
   */
  get_org_list_state() {
    return toJS(this.org_list)
  }
}
