import { observable, makeObservable, toJS } from 'mobx'
import { ProfileRequest } from '@/services/apis/personal'
import { DEFAULT_PERSONALDETAIL } from '@/config/index'
import { PersonalDetail } from '@/types/business'
import { MessageUtils } from '@/utils'

export class ProfileStore {
  profile: PersonalDetail = DEFAULT_PERSONALDETAIL
  constructor() {
    makeObservable(this, {
      profile: observable,
    })
  }

  // 获取用户信息
  async get_information() {
    const profileInfo = await ProfileRequest.get_profile()
    this.profile = profileInfo.data
    // localStorage.setItem('loginState', JSON.stringify(profileInfo.data))
  }

  // 更改密码
  async post_changepwd(data: { newpassword: string; oldpassword: string }) {
    MessageUtils.MsgSuccess((await ProfileRequest.post_pwd(data)).message)
  }

  // 修改用户信息
  async put_information(data: { avatar_url: string; name: string }) {
    MessageUtils.MsgSuccess((await ProfileRequest.put_profile(data)).message)
  }

  // 上传头像
  async post_avatar(data: { data: string }) {
    const uploadImageRes = await ProfileRequest.post_avatar(data)
    MessageUtils.MsgSuccess(uploadImageRes.data.message)
    return uploadImageRes.data.data
  }

  /**
   * 处理toJS(profile)
   * @returns profile
   */
  get_profile_state() {
    return toJS(this.profile)
  }
}
