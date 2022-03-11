import { TreeProps } from 'antd'

export interface ITreeProps extends TreeProps {
  showTitileRender?: boolean // 是否显示右侧操作树
  selectedOrg?: any // 处理选择的树
  addTree?: any // 添加子节点
  editTree?: any // 编辑当前节点
  treeData: any // 节点数据源
  onLoadData?: any // 异步加载子节点
  detailTree?: any // 机构详情
  freezeTree?: any // 冻结机构
  uploadTree?: any // 批量导入
}

export interface TreeDataNode {
  title: string
  key: string
  org_id: string
  children?: TreeDataNode[]
}
