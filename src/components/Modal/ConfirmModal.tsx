import React, { useState } from 'react'
import { Modal } from "antd";
import Typography from '../Typography';
import Button from '../CustomButton/Button';

interface ConfirmModalProps{
    title: string
    open: boolean
    handleOk?: React.MouseEventHandler
    handleCancel?: React.MouseEventHandler
    rOrl?: boolean 
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({title, open, handleOk, handleCancel, rOrl}) => {

    return (
        <Modal
        open={open} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        centered closeIcon
        style={{padding: 10}}
        width={742}
        footer={
            <div></div>
        }>
            <div className="flex flex-col space-y-[48px] mx-16 my-12">
                <Typography className='mx-auto' color='text01' variant='h2' type='medium'>
                    {title}
                </Typography>
                <div className="flex space-x-[36px] justify-center">
                    <Button
                        label='Tidak'
                        id={`tidak`}
                        color={rOrl ? 'orangeBorder' : 'orange'}
                        size='normal'
                        onClick={handleCancel}
                    />
                    <Button
                        label='Ya'
                        id='ya'
                        color={rOrl ? 'orange' : 'orangeBorder'}
                        size='normal'
                        onClick={handleOk}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmModal