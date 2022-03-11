/*
 * @Author: weiqi
 * @Date: 2022-02-11 10:55:50
 * @LastEditors: weiqi
 * @LastEditTime: 2022-02-24 17:16:25
 * @Description: file content
 * @FilePath: /yl-cms/frontend/ms-userorg/src/services/apis/employee/index.ts
 */
import { request } from '../../request'
import { USERORG_AUTHPATH } from '../../config'

class EmployeeRequest {
  /**
   * 发送邀请
   */
  static post_employee_msg(data: { org_id: number; org_name: string; phone: string; role_id: Array<number> }) {
    return request(USERORG_AUTHPATH + 'employee/sendInvitationMsg', 'POST', data, { throwErr: true })
  }

  /**
   * 获取机构员工
   * @param query 查询参数
   * @param page 页码数
   * @param count 每页条数
   */
  static get_employee_list(orgId: number, page?: number, count?: number, query: any = {}) {
    return request(USERORG_AUTHPATH + `employees/onJob/${orgId}?page=${page}&count=${count}&query=${JSON.stringify(query)}`, 'GET', {}, { showloading: true })
  }
  /**
   * 获取组织架构下待接受邀请员工列表
   * @param orgId 组织机构id
   */
  static request_pending_employees(orgId: number) {
    return request(USERORG_AUTHPATH + `employee/invitation/pending?org_id=${orgId}`, 'GET', {}, { showloading: true })
  }
  /**
   * 撤回邀请
   * @param orgId 组织机构id
   * @param phone 手机号
   */
  static delete_pending_invitation(orgId: number, phone: string) {
    return request(USERORG_AUTHPATH + `employee/invitation/revoke?org_id=${orgId}&phone=${phone}`, 'DELETE', {}, { throwErr: true })
  }
  /**
   * 用户详情
   * @param userId 用户ID
   */
  static get_employee_detail(userId: number, data: { org_id: number }) {
    return request(USERORG_AUTHPATH + `employee/${userId}`, 'GET', data, { showloading: true })
  }

  /**
   * 冻结/解冻用户
   * @param userId 用户ID
   * @param data body
   * @returns
   */
  static post_employee_freeze(data: { org_id: number; freeze: number; user_id: number }) {
    return request(USERORG_AUTHPATH + `employee/freeze`, 'POST', data, { throwErr: true })
  }

  /**
   * 解雇用户
   * @param userId 用户ID
   * @param data body
   * @returns
   */
  static delete_employee_unemployee(userId: number, data: { org_id: number }) {
    return request(USERORG_AUTHPATH + `employee/unemployee/${userId}`, 'DELETE', data, { throwErr: true })
  }

  /**
   * 任命员工职务
   * @param userId 用户ID
   * @param data body
   * @returns
   */
  static post_employee_assignrole(data: { ord_id: number; role_id: number; user_id: number }) {
    return request(USERORG_AUTHPATH + `employee/assignrole`, 'POST', data)
  }

  /**
   * 任命员工职务
   * @param userId 用户ID
   * @param data body
   * @returns
   */
  static delete_employee_revokerole(userId: number, data: { ord_id: number; role_id: number }) {
    return request(USERORG_AUTHPATH + `employee/revokerole/${userId}`, 'DELETE', data)
  }

  /**
   * 获取待职员列表
   * @param page 第几页
   * @param count 每页条数
   * @returns
   */
  static get_employee_idle(page: number, count: number, query: any = {}) {
    return request(USERORG_AUTHPATH + `/employees/idle?page=${page}&count=${count}&query=${JSON.stringify(query)}`, 'GET', {}, { showloading: true })
  }
}

export default EmployeeRequest
