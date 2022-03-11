/* eslint-disable no-eval */
import { observable, makeObservable, toJS } from 'mobx'
import { OrganizationRequest } from '@/services/apis'
import { OrgDetail, OrgTreeNode } from '@/types/business'
import { DEFAULT_ORGDETAIL, DEFAULT_ORGTREENODE } from '@/config/index'
import { MessageUtils } from '@/utils'

export class OrganizationStore {
  org_list: OrgTreeNode[] = [DEFAULT_ORGTREENODE]
  org_detail: OrgDetail = DEFAULT_ORGDETAIL

  constructor() {
    makeObservable(this, {
      org_list: observable,
      org_detail: observable,
    })
  }

  /**
   * 获取组织机构
   */
  async get_organization() {
    const orglistRes = await OrganizationRequest.get_organization()
    this.org_list = orglistRes.data
  }

  /**
   * 新增直属（子节点）
   */
  async add_children_org(data: { org_id: number; title: string; orgcode: string }) {
    MessageUtils.MsgSuccess((await OrganizationRequest.add_children_organ(data)).message)
  }

  /**
   * 获取机构详情
   * @param orgId 机构ID
   */
  async get_organization_detail(orgId: number) {
    const orgDetailRes = await OrganizationRequest.get_organ_detail(orgId)
    const orgDetail = orgDetailRes.data
    orgDetail['gallery'] = orgDetail['gallery'] ? eval(orgDetail['gallery']) : []
    this.org_detail = orgDetail
  }

  /**
   * 修改组织机构
   * @param orgId 被修改的组织ID
   * @param data data
   * @returns promise
   */
  async put_organization(orgId: number, data: { parent_id?: number; title?: string; orgcode?: string; address?: string; phone?: string; gallery?: string; contacter?: string }) {
    MessageUtils.MsgSuccess((await OrganizationRequest.put_organ(orgId, data)).message)
  }

  /**
   * 冻结组织机构
   * @param orgId 被冻结的组织ID
   * @param data data
   */
  async put_freeze_organization(orgId: number, data: { available: string }) {
    MessageUtils.MsgSuccess((await OrganizationRequest.freeze_organ(orgId, data)).message)
  }

  /**
   * 批量上传组织机构
   * @param data
   */
  async upload_organization(data: Array<any>) {
    MessageUtils.MsgSuccess((await OrganizationRequest.uplaod_organ(data)).message)
  }

  /**
   * 上传组织机构图集
   * @param data 上传图像数据
   */
  async post_org_gallery(data: any) {
    const orgUploadRes = await OrganizationRequest.post_org_gallery(data)
    MessageUtils.MsgSuccess(orgUploadRes.message)
    return orgUploadRes.data.data
  }

  /**
   * 处理toJS(this.org_list)
   * @returns orgList
   */
  get_org_list_state() {
    return toJS(this.org_list)
  }

  /**
   * 处理toJS(this.org_detail)
   * @returns org_detail
   */
  get_org_detail_state() {
    return toJS(this.org_detail)
  }
}
