import React, { useState } from 'react'
import { Modal, Upload, Alert } from 'antd'
import { useStore } from '@/hooks/useStore'
import * as XLSX from 'xlsx'

interface UploadOrganizePorps {
  uploadVisibled: boolean
  setUploadVisibled: any
  orgId: number
  getOrgList: any
}

const UploadOrganize: React.FC<UploadOrganizePorps> = props => {
  const { uploadVisibled, setUploadVisibled, orgId, getOrgList } = props
  const [sheet_json_data, setSheetJsonData] = useState<any>([])
  const { organizationInatance } = useStore()

  /**
   * 确认导入
   */
  const confirmUpload = async () => {
    const data: any = {
      org_id: orgId,
      excel_json: [...sheet_json_data],
    }
    await organizationInatance.upload_organization(data)
    getOrgList()
    setUploadVisibled(false)
  }

  /**
   * 导入Excel
   * @param file 导入文件
   * @param fileList 文件列表
   * @returns
   */
  const upload_excel_file = async (file: any, fileList: any) => {
    const rABS = true
    const f = fileList[0]
    const reader = new FileReader()

    const preUploadRes = await new Promise(resolve => {
      reader.onload = async function (e: any) {
        let data: any = e.target.result
        if (!rABS) data = new Uint8Array(data)
        const workbook = XLSX.read(data, {
          type: rABS ? 'binary' : 'array',
        })
        const sheets = workbook.SheetNames
        const assets_json: any = []
        for (let i = 0; i < sheets.length; i++) {
          const worksheet = workbook.Sheets[sheets[i]]
          const excel_json = XLSX.utils.sheet_to_json(worksheet)
          assets_json.push(...excel_json)
        }

        if (assets_json) {
          resolve(true)
          setSheetJsonData(assets_json)
        }
      }
      if (rABS) reader.readAsBinaryString(f)
      else reader.readAsArrayBuffer(f)
    })

    return preUploadRes ? false : Upload.LIST_IGNORE
  }

  return (
    <Modal title='批量上传组织机构' visible={uploadVisibled} okText='确认导入' onOk={confirmUpload} onCancel={() => setUploadVisibled(false)}>
      <Alert
        message={
          <>
            上传的EXCEL表需要严格遵循格式规范，可以
            <a href='./组织机构表模板.xlsx'>
              <b>点击此处</b>
            </a>
            下载组织机构表规范模板
          </>
        }
        type='info'
        style={{ marginBottom: 10 }}
      />
      <Upload.Dragger maxCount={1} beforeUpload={upload_excel_file} className='upload_excel_files_header_container'>
        <p className='ant-upload-text'>
          {' '}
          <span>点击上传文件</span> 或 拖拽到此区域
        </p>
        <p className='ant-upload-hint'>支持Excel单个文件上传，默认识别第一个sheet文件（单个Excel文件最大8M）</p>
      </Upload.Dragger>
    </Modal>
  )
}

export default UploadOrganize
