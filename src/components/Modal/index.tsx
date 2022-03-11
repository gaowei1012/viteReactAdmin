import React from 'react'
import { Modal } from 'antd'
import { IModalProps } from '../../interfaces/components/modal'

const QwdModal: React.FC<IModalProps> = (props) => {
  const { visible, children, onOk, okText, onCancel, cancelText } = props
  return (
    <Modal onOk={onOk} okText={okText} onCancel={onCancel} cancelText={cancelText} visible={visible}>
      {children}
    </Modal>
  )
}

export default QwdModal
