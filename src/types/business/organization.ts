/**
 * @interface 登录时选择组织机构角色,列表元素
 * */
export interface OrgRoleAbstract {
  org_id: number
  title: string
  role_id: number
  role: string
  is_freezed: number
}

export interface OrgDetail {
  org_id: number
  parent_id: number
  parent_title: string
  ancient: string
  title: string
  orgcode: string
  available: string
  orginfo_id: number
  address: string
  phone: string
  gallery: string[]
  contacter: string
  depth: number
  createdAt: string
  updatedAt: string
}

/**
 * @interface 组织机构树节点,展示组织机构树使用
 * */
export interface OrgTreeNode {
  // org_id: string;
  org_id: number
  parent_id: number
  title: string
  available: string
  children: OrgTreeNode[]
}
