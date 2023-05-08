import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Button from '../components/CustomButton/Button'
import { Modal, Spin } from 'antd';
import ConfirmModal from '../components/Modal/ConfirmModal';

const Draft = () => {
  
  const [showModal, setShowModal] = useState(false)

  const handleCancel = () => {
    setShowModal(!showModal)
  }  


  return (
    <>
      <Sidebar/>
      <div className="mx-40">
        <Button
          id='tes'
          color='orange'
          size='normal'
          label='buka'
          onClick={()=> setShowModal(true)}
        />
        <ConfirmModal
        title='Yakin Ingin Menghapus?'
        open={showModal}
        handleCancel={handleCancel}
        rOrl={true}
        />
      </div>
      
    </>
  )
}

export default Draft