import { observable, makeObservable, toJS } from 'mobx'
import { EmployeeList, EmployeeDetail, IdleList } from '@/types/business'
import { EMPTY_ROWS, DEFAULT_EMPLOYEEDETAL } from '@/config/index'
import { EmployeeRequest } from '@/services/apis'
import { MessageUtils, Utils } from '@/utils'

export class EmployeeStore {
  employee_list: EmployeeList = EMPTY_ROWS
  pending_list: any = []
  employee_detail: EmployeeDetail = DEFAULT_EMPLOYEEDETAL
  leave_list: IdleList = EMPTY_ROWS
  constructor() {
    makeObservable(this, {
      employee_list: observable,
      employee_detail: observable,
      leave_list: observable,
    })
  }

  /**
   * 邀请新员工
   * @param data 邀请body
   * @returns promise
   */
  async post_employee_invitation(data: { org_id: number; org_name: string; phone: string; role_id: Array<number> }) {
    MessageUtils.MsgSuccess((await EmployeeRequest.post_employee_msg(data)).message)
  }

  /**
   * 获取机构员工
   * @param orgId 组织机构id
   * @param page 页码数
   * @param count 每页条数
   * @param query 查询参数
   */
  async get_employee_list(orgId: number, page: number, count: number, query: any) {
    const formatedQuery = { ...query }
    Utils.FormatRequestQuery(formatedQuery)('name', 'like')
    const employeeRes = await EmployeeRequest.get_employee_list(orgId, page, count, formatedQuery)
    this.employee_list = employeeRes.data
  }

  /**
   * 获取机构下待接受邀请员工列表
   * @param orgId 组织机构id
   */
  async request_pending_employee_list(orgId: number) {
    this.pending_list = (await EmployeeRequest.request_pending_employees(orgId)).data
  }

  /**
   * 用户详情
   * @param userId 用户ID
   */
  async get_employee_detail(userId: number, data: { org_id: number }) {
    const userInfoRes = await EmployeeRequest.get_employee_detail(userId, data)
    const userData = userInfoRes.data
    userData['role_id'] = Utils.formattedStringToArray(userData.role_id)
    this.employee_detail = userData
  }

  /**
   * 冻结/解冻员工
   * @param userId 用户ID
   * @param data body
   * @returns
   */
  async post_employee_freeze(data: { org_id: number; freeze: number; user_id: number }) {
    MessageUtils.MsgSuccess((await EmployeeRequest.post_employee_freeze(data)).message)
  }

  /**
   * 解雇员工
   * @param userId 用户ID
   * @param data body
   * @returns
   */
  async delete_emloyee_unemployee(userId: number, data: { org_id: number }) {
    MessageUtils.MsgSuccess((await EmployeeRequest.delete_employee_unemployee(userId, data)).message)
  }

  /**
   * 任命员工职务
   * @param userId 用户ID
   * @param data body
   * @returns
   */
  async post_employee_assignrole(data: { ord_id: number; role_id: number; user_id: number }) {
    MessageUtils.MsgSuccess((await EmployeeRequest.post_employee_assignrole(data)).message)
  }

  /**
   * 收回员工职务
   * @param userId 用户ID
   * @param data body
   * @returns
   */
  async delete_employee_revokerole(userId: number, data: { ord_id: number; role_id: number }) {
    MessageUtils.MsgSuccess((await EmployeeRequest.delete_employee_revokerole(userId, data)).message)
  }

  /**
   * 获取待职员列表
   * @param page 第几页
   * @param count 每页条数
   * @returns
   */
  async get_employee_idle(page: number, count: number, query: any) {
    const idleEmployeeRes = await EmployeeRequest.get_employee_idle(page, count, query)
    this.leave_list = idleEmployeeRes.data
  }

  /**
   * 处理toJS(this.leave_list)
   * @returns leave_list
   */
  get_leave_list_state() {
    return toJS(this.leave_list)
  }

  /**
   * 处理toJS(this.employee_detail)
   * @returns employee_detail
   */
  get_employee_detail_state() {
    return toJS(this.employee_detail)
  }

  /**
   * 处理toJS(employee_list)
   * @returns employee_list
   */
  get_employee_list_state() {
    return toJS(this.employee_list)
  }
}
