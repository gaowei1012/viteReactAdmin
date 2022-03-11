import { request } from '../../request'
import { openPath } from '../../config'

class AuthorizationRequest {
  // 登录
  static post_login(data: { username: string; password: string }) {
    return request(openPath + 'login', 'POST', data)
  }

  // 注册
  //   static post_register(data) {
  //     return request(openPath + 'register', 'POST',data)
  //   }

  // 找回密码
  static change_password(data: { oldpassword: string; newpassword: string }) {
    return request(openPath + 'userpermission/changepassword', 'PUT', data)
  }

  //登出
  static post_logout() {
    return request(openPath + 'userpermission/logout', 'POST')
  }
  //获取组织机构角色列表
  static get_orgrole_list() {
    return request(openPath + 'userpermission/roleinorgs', 'GET')
  }
  //用户确定登入系统的组织机构角色
  static post_selectrole(data: { org_id: number; role_id: number }) {
    return request(openPath + 'userpermission/selectrole', 'POST', data)
  }
  // 忘记密码
  static forget_password(data: { phoneNumber: string; password: string; code: string }) {
    return request(openPath + 'reset/password', 'POST', data)
  }
  // 找回密码， 发送验证码
  static get_opt(data: { phoneNumbers: string; type: number }) {
    return request(openPath + 'sendOTP', 'POST', data)
  }
}

export default AuthorizationRequest
