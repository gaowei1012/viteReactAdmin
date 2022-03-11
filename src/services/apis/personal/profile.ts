import { request } from '../../request'
import { openPath } from '../../config'

class ProfileRequest {
  // 修改密码
  static post_pwd(data: { newpassword: string; oldpassword: string }) {
    return request(openPath + 'userpermission/changepassword', 'PUT', data)
  }
  // 获取个人信息
  static get_profile() {
    return request(openPath + 'userpermission/profile', 'GET', {}, { showloading: true })
  }
  // 编辑个人信息
  static put_profile(data: { avatar_url: string; name: string }) {
    return request(openPath + 'userpermission/profile', 'PUT', data)
  }
  // 上传头像
  static post_avatar(data: { data: string }) {
    return request(openPath + 'avatar_url', 'POST', data)
  }
}

export default ProfileRequest
