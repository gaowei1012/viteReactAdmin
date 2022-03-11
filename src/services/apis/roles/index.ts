import { request } from '../../request'
import { USERORG_AUTHPATH } from '../../config'

class RoleRequest {
  /**
   * 获取角色列表
   * @param page 第几页
   * @param count 每页条数
   * @param query 查询条件
   * @returns Promise
   */
  static get_role_list(page?: number, count?: number, query: any = {}) {
    return request(USERORG_AUTHPATH + `role?page=${page}&count=${count}&query=${JSON.stringify(query)}`, 'GET', {}, { showloading: true })
  }
  /**
   * 添加角色
   * @param data 添加body
   */
  static post_role(data: { role: string; type: number; level: number }) {
    return request(USERORG_AUTHPATH + 'role', 'POST', data, { throwErr: true })
  }

  /**
   * 更新角色
   * @param data 添加body
   */
  static put_role(roleId: string, data: { role: string; type: number; level: number }) {
    return request(USERORG_AUTHPATH + `role/${roleId}`, 'PUT', data, { throwErr: true })
  }
}

export default RoleRequest
