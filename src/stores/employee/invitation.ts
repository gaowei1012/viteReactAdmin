import { observable, makeObservable, toJS } from 'mobx'
import { InvitaionRequest } from '@/services/apis'
import { InvitationPayload } from '@/types/business'
import { DEFAULT_INVITATIONPAYLOAD } from '@/config/index'

export class InvitaionStore {
  invitation: InvitationPayload = DEFAULT_INVITATIONPAYLOAD
  constructor() {
    makeObservable(this, {
      invitation: observable,
    })
  }
  /**
   * 校验jwt是否过期
   * @param jwt
   */
  async request__invitation_payload(jwt: string) {
    this.invitation = (await InvitaionRequest.verification_invitation(jwt)).data
  }
  /**
   * 确认邀请,注册
   * @param data
   * @returns
   */
  async post_invitation_register(data: any) {
    await InvitaionRequest.invitation_register(data)
  }
  /**
   * 接收/拒绝任职邀请
   * @param data
   * @returns
   */
  async post_invitation_notarize(data: any) {
    await InvitaionRequest.invitation_notarize(data)
  }

  /**
   * 处理toJS(this.invitation)
   * @returns invitation
   */
  get_invitation_info() {
    return toJS(this.invitation)
  }
}
