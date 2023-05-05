import React from 'react'
import Loading from '../../assets/svg/Loading';
import { Modal, Spin } from 'antd';
import Typography from '../Typography';

interface AlertModalProps{
    open: boolean
    loading: boolean
}

const LoadingAlert:React.FC<AlertModalProps> = ({ open, loading}) => {
    
    const antIcon = <Loading/>
    return (
        <Modal
        open={open}
        confirmLoading={open}
        centered closeIcon
        className='p-10'
        footer={<></>}
        width={800}
        >
        {loading ? (
            <div style={{ textAlign: 'center' }} className='my-20'>
                <Spin indicator={antIcon} />
                <Typography className='mt-12' color='text01' variant='h1' type='semibold'>
                    Loading
                </Typography>
            </div>
        ) : (
            <></>
        )}
        </Modal>
    )
}

export default LoadingAlert