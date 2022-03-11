import { observable, makeObservable, toJS } from 'mobx'
import { GerneralRequest } from '@/services/apis'
import { MessageUtils, Utils } from '@/utils'
import { DEFAULT_RESIDENTDETAIL, EMPTY_ROWS } from '@/config/index'
import { ResidentDetail, ResidentList } from '@/types/business'

export class GerneralStore {
  gerneral_list: ResidentList = EMPTY_ROWS
  gerneral_detail: ResidentDetail = DEFAULT_RESIDENTDETAIL
  constructor() {
    makeObservable(this, {
      gerneral_list: observable,
      gerneral_detail: observable,
    })
  }

  /**
   * 获取组织下业务用户列表
   * @param query 查询条件
   * @param page 第几页
   * @param count 每页有多少条数据
   */
  async gerneral_user_list(orgId: number, page: number, count: number, query: any) {
    const formatedQuery = { ...query }
    Utils.FormatRequestQuery(formatedQuery)('name', 'like')
    const residentListRes = await GerneralRequest.gerneral_user_list(orgId, page, count, formatedQuery)
    this.gerneral_list = residentListRes.data
  }

  /**
   * 获取用户详情
   * @param userId 用户ID
   * @param orgId 组织ID
   * @returns
   */
  async gerneral_user_detail(userId: number, orgId: number) {
    const residentDetailRes = await GerneralRequest.gerneral_user_detail(userId, orgId)
    const detail = residentDetailRes.data
    detail['role_id'] = Utils.formattedStringToArray(detail.role_id)
    detail['roles'] = Utils.ExtractItemBetweenBracket(detail.roles)
    this.gerneral_detail = residentDetailRes.data
  }

  /**
   * 封禁/解封组织下业务用户
   * @param org_list 组织ID
   * @param userId 用户ID
   * @data body
   */
  async gerneral_user_freeze(data: { user_id: number; org_id: number; active: number }) {
    MessageUtils.MsgSuccess((await GerneralRequest.gerneral_user_freeze(data)).message)
  }

  /**
   * 业务用户导入
   * @param ordId 组织机构ID
   * @param data Excel结构体
   */
  async upload_gerneral_users(data: any) {
    MessageUtils.MsgSuccess((await GerneralRequest.upload_gerneral_users(data)).message)
  }

  /**
   * 处理toJS(this.gerneral_list)
   * @returns gerneral_list
   */
  get_gerneral_list_state() {
    return toJS(this.gerneral_list)
  }

  /**
   * 处理toJS(this.gerneral_detail)
   * @returns gerneral_detail
   */
  get_gerneral_detail_state() {
    return toJS(this.gerneral_detail)
  }
}
