import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import React from 'react'

const DeleteModal = (props) => {
  return (
    <Modal
      open={props.showConfirmModal}
      onOk={props.handleDelete}
      onCancel={props.handleDelteCancel}
    >
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <ExclamationCircleOutlined style={{ color: 'red', fontSize: 24 }} />
        <h4 className='m-2'>Delete Transacton?</h4>
                
        </div>
        <p className='mx-3 my-2'> Are you sure you want to delete this transaction?</p>
        <div style={{ textAlign: 'right' }}>
        </div>
    </Modal>
  )
}

export default DeleteModal
