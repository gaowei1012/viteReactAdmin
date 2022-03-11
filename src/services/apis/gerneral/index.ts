import { request } from '../../request'
import { USERORG_AUTHPATH } from '../../config'

class GerneralRequest {
  /**
   * 获取组织下业务用户列表
   * @param org_list 组织ID
   * @param page 第几页
   * @param count 每页有多少条数据
   * @param query 查询条件
   */
  static gerneral_user_list(orgId: number, page?: number, count?: number, query: any = {}) {
    return request(USERORG_AUTHPATH + `gerneral_users/${orgId}?query=${JSON.stringify(query)}&page=${page}$count=${count}`, 'GET', {}, { showloading: true })
  }

  /**
   * 导入业务用户
   * @param orgId 组织ID
   * @param data body
   */
  static upload_gerneral_users(data: any) {
    return request(USERORG_AUTHPATH + 'gerneral_user/import', 'POST', data)
  }

  /**
   * 封禁/解封组织下业务用户
   * @param org_list 组织ID
   * @param userId 用户ID
   * @data body
   */
  static gerneral_user_freeze(data: { user_id: number; org_id: number; active: number }) {
    return request(USERORG_AUTHPATH + `gerneral_user`, 'POST', data, { showloading: true })
  }

  /**
   * 获取业务人员详情
   * @param userId 用户ID
   * @param orgId 组织ID
   */
  static gerneral_user_detail(userId: number, orgId: number) {
    return request(USERORG_AUTHPATH + `gerneral_user/${userId}?org_id=${orgId}`, 'GET', {}, { showloading: true })
  }
}

export default GerneralRequest
