import { request } from '../../request'
import { openPath } from '../../config'

class InvitaionRequest {
  /**
   * 校验jwt是否过期
   * @param jwt jwt
   */
  static verification_invitation(jwt: string) {
    return request(openPath + `employee/isInvitationTokenValid?jwt=${jwt}`, 'GET', {})
  }

  /**
   * 确认邀请,注册
   * @param data
   * @returns
   */
  static invitation_register(data: any) {
    return request(openPath + 'employee/register', 'POST', data)
  }

  /**
   * 同意邀请
   * @param data
   * @returns
   */
  static invitation_notarize(data: any) {
    return request(openPath + 'employee/enroll', 'POST', data)
  }
}

export default InvitaionRequest
