import { request } from '../../request'
import { USERORG_AUTHPATH, openPath } from '../../config'

class OrganizationRequest {
  /**
   * 登录获取组织机构
   * @returns request
   */
  static get_organ() {
    return request(USERORG_AUTHPATH + 'user/loginorg', 'GET', {}, { showloading: true })
  }

  /**
   * 获取直属组织机构（展开）
   */
  static get_organization() {
    return request(USERORG_AUTHPATH + 'organization', 'GET', {}, { showloading: true })
  }

  /**
   * 添加直属机构
   */
  static add_children_organ(data: { org_id: number; title: string; orgcode: string }) {
    return request(USERORG_AUTHPATH + 'organization', 'POST', data, { throwErr: true })
  }
  /**
   * 机构详情
   * @param orgId
   */
  static get_organ_detail(orgId: number) {
    return request(USERORG_AUTHPATH + `organization/${orgId}`, 'GET', {}, { showloading: true })
  }
  /**
   * 修改组织机构
   * @param orgId 被修改的组织ID
   * @param data data
   */
  static put_organ(orgId: number, data: { parent_id?: number; title?: string; orgcode?: string; address?: string; phone?: string; gallery?: string; contacter?: string }) {
    return request(USERORG_AUTHPATH + `organization/${orgId}`, 'PUT', data, { throwErr: true })
  }

  /**
   * 冻结组织机构
   * @param orgId 被冻结的组织ID
   * @param data data
   */
  static freeze_organ(orgId: number, data: { available: string }) {
    return request(USERORG_AUTHPATH + `organization/available/${orgId}`, 'PUT', data, { throwErr: true })
  }
  /**
   * 批量上传组织机构
   * @param data
   */
  static uplaod_organ(data: Array<any>) {
    return request(USERORG_AUTHPATH + 'organization/import', 'POST', data)
  }

  /**
   * 上传组织机构图集
   * @param data 上传图像数据
   */
  static post_org_gallery(data: any) {
    return request(openPath + 'gallery', 'POST', data)
  }
}

export default OrganizationRequest
