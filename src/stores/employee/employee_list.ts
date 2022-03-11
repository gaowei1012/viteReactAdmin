import { observable, makeObservable, toJS } from 'mobx'
import { InvitationPendingAbstract } from '@/types/business'
import { EmployeeRequest } from '@/services/apis'
import { MessageUtils } from '@/utils'

export class EmployeeListStore {
  pending_list: InvitationPendingAbstract[] = []

  constructor() {
    makeObservable(this, {
      pending_list: observable,
    })
  }
  init() {
    this.pending_list = []
  }
  /**
   * 获取机构下待接受邀请员工列表
   * @param orgId 组织机构id
   */
  async request_pending_employee_list(orgId: number) {
    this.pending_list = (await EmployeeRequest.request_pending_employees(orgId)).data
  }

  /**
   * 撤回邀请
   * @param orgId 组织机构id
   * @param phone 手机号
   */
  async revoke_pending_invitation(orgId: number, phone: string) {
    MessageUtils.MsgSuccess((await EmployeeRequest.delete_pending_invitation(orgId, phone)).message)
  }

  /**
   * 返回待接受邀请员工列表
   * @returns
   */
  get_pending_list() {
    return toJS(this.pending_list)
  }
}
