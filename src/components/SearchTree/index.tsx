/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudUploadOutlined, InfoCircleOutlined, PauseCircleOutlined, PlusOutlined, StopOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import '../../styles/components/tree.scss'
import { Tooltip, Tree, TreeNodeProps } from 'antd'
const { TreeNode } = Tree
interface SearchTreePorps extends TreeNodeProps {
  data: any
  filter?: any
  uploadTree?: any
  organizeDetail?: any
  freezeTree?: any
  addTree?: any
  showRight?: boolean
  onSelect?: any
}

const SearchTree: React.FC<SearchTreePorps> = props => {
  const [expandedKeys, setExpandedKeys] = useState<any>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [isExpandParent, setIsExpandParent] = useState<boolean>(false)

  const { data, filter, uploadTree, freezeTree, organizeDetail, addTree, showRight, onSelect, defaultExpandedKeys } = props

  useEffect(() => {
    setExpandedKeys(defaultExpandedKeys)
  }, [])

  useEffect(() => {
    /**
     * 搜索匹配，模糊查询
     * @param e event 输入框事件
     */
    if (filter != null) {
      setIsExpandParent(true)
      //当查询条件置空时，折叠所有节点
      if (filter == '' || filter == undefined) {
        setIsExpandParent(false)
      } else {
        const res = arrayTreeFilter(data, filterFn, filter)
        const expkey = expandedKeysFun(res)
        // setTreeData(res)
        setExpandedKeys(expkey)
        setSearchValue(filter)
      }
    }
  }, [filter])

  const expandedKeysFun = (treeData: any) => {
    if (treeData && treeData.length == 0) {
      return []
    }
    const arr: any = []
    const expandedKeysFn = (treeData: any) => {
      treeData.map((item: any) => {
        arr.push(item.org_id)
        if (item.children && item.children.length > 0) {
          expandedKeysFn(item.children)
        }
      })
    }
    expandedKeysFn(treeData)
    return arr
  }

  const arrayTreeFilter = (data: any, predicate: any, filterText: string) => {
    const nodes = data
    // 如果已经没有节点了，结束递归
    if (!(nodes && nodes.length)) {
      return
    }
    const newChildren = []
    for (const node of nodes) {
      if (predicate(node, filterText)) {
        // 如果自己（节点）符合条件，直接加入到新的节点集
        newChildren.push(node)
        // 并接着处理其 children,（因为父节点符合，子节点一定要在，所以这一步就不递归了）
        node.children = arrayTreeFilter(node.children, predicate, filterText)
      } else {
        // 如果自己不符合条件，需要根据子集来判断它是否将其加入新节点集
        // 根据递归调用 arrayTreeFilter() 的返回值来判断
        const subs: any = arrayTreeFilter(node.children, predicate, filterText)
        // 以下两个条件任何一个成立，当前节点都应该加入到新子节点集中
        // 1. 子孙节点中存在符合条件的，即 subs 数组中有值
        // 2. 自己本身符合条件
        if ((subs && subs.length) || predicate(node, filterText)) {
          node.children = subs
          newChildren.push(node)
        }
      }
    }
    return newChildren
  }

  const filterFn = (data: any, filterText: string) => {
    if (!filterText) {
      return true
    }
    return (
      //我是一title过滤 ，你可以根据自己需求改动
      new RegExp(filterText, 'i').test(data.title)
    )
  }

  const onExpand = (expandedKeys: any) => {
    setExpandedKeys(expandedKeys)
  }

  const renderTreeNode = (treeData: any) => {
    if (treeData.length == 0) return
    return treeData.map((item: any) => {
      const index = item.title.indexOf(searchValue)
      const beforeStr = item.title.substr(0, index)
      const afterStr = item.title.substr(index + searchValue.length)
      const title =
        index > -1 ? (
          <div className='tree_title_wrap'>
            <span>
              {beforeStr}
              <span style={{ color: 'red' }}>{searchValue}</span>
              {afterStr}
            </span>
            {showRight ? (
              <div className='right'>
                <Tooltip title='添加子组织机构'>
                  <PlusOutlined onClick={() => addTree(item.org_id)} />
                </Tooltip>
                <Tooltip title='导入组织直属机构'>
                  <CloudUploadOutlined rotate={0} onClick={() => uploadTree(item.org_id)} />
                </Tooltip>
                <Tooltip title='组织机构详情'>
                  <InfoCircleOutlined onClick={() => organizeDetail(item.org_id)} />
                </Tooltip>
                <Tooltip title={`${item.available !== '0' ? '冻结' : '解冻'}组织机构`}>
                  {item.available !== '0' ? <StopOutlined onClick={() => freezeTree(item.org_id, item.available)} /> : <PauseCircleOutlined onClick={() => freezeTree(item.org_id, item.available)} />}
                </Tooltip>
              </div>
            ) : null}
          </div>
        ) : (
          <div className='tree_title_wrap'>
            <span>{item.title}</span>
            {showRight ? (
              <div className='right'>
                <Tooltip title='添加子组织机构'>
                  <PlusOutlined onClick={() => addTree(item.org_id)} />
                </Tooltip>
                <Tooltip title='导入组织直属机构'>
                  <CloudUploadOutlined rotate={0} onClick={() => uploadTree(item.org_id)} />
                </Tooltip>
                <Tooltip title='组织机构详情'>
                  <InfoCircleOutlined onClick={() => organizeDetail(item.org_id)} />
                </Tooltip>
                <Tooltip title={`${item.available !== '0' ? '冻结' : '解冻'}组织机构`}>
                  <StopOutlined onClick={() => freezeTree(item.org_id, item.available)} />
                </Tooltip>
              </div>
            ) : null}
          </div>
        )
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode key={item.org_id} title={title}>
            {renderTreeNode(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.org_id} title={title} />
    })
  }

  return (
    <div className='tree'>
      <Tree blockNode onSelect={onSelect} onExpand={onExpand} expandedKeys={expandedKeys} autoExpandParent={isExpandParent} {...props}>
        {renderTreeNode(data)}
      </Tree>
    </div>
  )
}

export default SearchTree
