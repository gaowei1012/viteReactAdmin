/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Modal, Upload, Alert } from 'antd'
import { useStore } from '@/hooks/useStore'
import * as XLSX from 'xlsx'

interface GerneralUploadProps {
  uploadVisibled: boolean
  setUploadVisibled: any
  orgId: number
  getOrgList: any
}

const GerneralUpload: React.FC<GerneralUploadProps> = props => {
  const { uploadVisibled, setUploadVisibled, orgId, getOrgList } = props
  const [sheet_json_data, setSheetJsonData] = useState<any>([])
  const { gerneralInatance } = useStore()

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
          assets_json.push({
            sheetname: sheets[i],
            data: excel_json,
          })
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

  /**
   * 确认导入业务用户
   */
  const confirmUpload = async () => {
    const data: any = {
      org_id: orgId,
      excel_json: [...sheet_json_data],
    }
    await gerneralInatance.upload_gerneral_users(data)
    setUploadVisibled(false)
    getOrgList()
  }

  /**
   * 取消
   */
  const cancelUpload = () => {
    setUploadVisibled(false)
  }

  return (
    <Modal visible={uploadVisibled} title='批量导入业务用户' width={600} okText='保存' cancelText='取消' onCancel={cancelUpload} onOk={confirmUpload} maskClosable={false}>
      <Alert
        message={
          <React.Fragment>
            上传的EXCEL表需要严格遵循格式规范，可以
            <a href='./业务用户模板表.xlsx'>
              <b>点击此处</b>
            </a>
            下载业务用户表规范模板
          </React.Fragment>
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

export default GerneralUpload
