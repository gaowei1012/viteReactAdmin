import { observable, makeObservable, toJS } from 'mobx'
import { RoleList } from '@/types/business'
import { RoleRequest } from '@/services/apis'
import { EMPTY_ROWS } from '@/config/index'
import { MessageUtils } from '@/utils'

type editRoleType = {
  role_id: number
  role: string
  type: number
  level: number
}

export class RoleStore {
  role_list: RoleList = EMPTY_ROWS
  edit_role: any = {
    role_id: 0,
    role: '',
    type: 0,
    level: 0,
  }
  constructor() {
    makeObservable(this, {
      role_list: observable,
      edit_role: observable,
    })
  }

  /**
   * 获取角色列表
   * @param page 当前页码数
   * @param count 每一页中多少条数据
   * @param query 查询参数
   * @returns
   */
  async get_role_list(page?: number, count?: number, query: any = {}) {
    const roleListRes = await RoleRequest.get_role_list(page, count, query)
    this.role_list = roleListRes.data
    return this.role_list
  }

  /**
   * 添加角色
   * @param data 添加body
   */
  async post_role(data: { role: string; type: number; level: number }) {
    MessageUtils.MsgSuccess((await RoleRequest.post_role(data)).message)
  }

  /**
   * 更新角色
   * @param data 添加body
   */
  async put_role(roleId: string, data: { role: string; type: number; level: number }) {
    MessageUtils.MsgSuccess((await RoleRequest.put_role(roleId, data)).message)
  }

  /**
   * 处理toJS(role_list)转数据
   * 避免页面上频繁toJS
   * @returns role_list
   */
  get_role_list_state() {
    return toJS(this.role_list)
  }

  // 设置编辑
  set_edit_state(args: editRoleType) {
    this.edit_role = {
      role_id: args.role_id,
      role: args.role,
      type: args.type,
      level: args.level,
    }
  }

  // 获取编辑值
  get_edit_state() {
    return toJS(this.edit_role)
  }
}
