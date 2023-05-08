import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Typography from '../components/Typography'
import { Avatar, Button, Input } from 'antd'
import { FiSearch } from "react-icons/fi";
import data from "../dummy/exam.json"
import { Collapse } from 'antd';
import ConfirmModal from '../components/Modal/ConfirmModal';
import CustomCollapse from '../components/Collapse';
import CustomTable from '../components/Table';
import { useCookies } from 'react-cookie';
import Display from '../components/DisplayContent/Display';
import profilePict from '../assets/default.png'

const { Panel } = Collapse

const columns = [
    { title: 'Tanggal', dataIndex: 'tanggal', key: 'tanggal' },
    { title: 'Judul', dataIndex: 'judul', key: 'judul' },
    { title: 'Alat', dataIndex: 'alat', key: 'alat' },
];
const Dashboard = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cookie] = useCookies(['token', 'id', 'name', 'email', 'foto'])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Sidebar/>
            <Display>
                <div className="flex justify-between w-11/12 mx-auto mt-10">
                    <Typography color='text01' variant='h2' type='medium'>
                        Hello Admin!
                    </Typography>
                    <Avatar size={80} src={cookie.foto === '' ? profilePict : cookie.foto}/>
                </div>
                <div className="flex flex-row justify-center space-x-5 mx-auto w-11/12 my-10">
                    <Input
                        size='large'
                        placeholder="Enter your username"
                        prefix={<FiSearch className="site-form-item-icon" />}
                    />
                    
                    <Button 
                    size='large'
                    className=' hover:bg-primary-90 border-primary-100 text-primary-100 hover:text-white w-96'
                    onClick={showModal}>
                    + Buat Berita
                    </Button>
                    <Button 
                    size='large'
                    className=' hover:bg-primary-90 border-primary-100 text-primary-100 hover:text-white w-96'>
                    + Buat Asset
                    </Button>
                </div>
                <div className="flex flex-col justify-center space-y-5 mx-auto w-11/12 my-10">
                    <CustomCollapse 
                    header='Berita'
                    key={1}
                    > 
                        {data.map((item:any) => {
                            return(
                                <CustomTable
                                key={item.id}
                                tanggal={item.tanggal}
                                judul={item.judul}
                                />
                            )
                        })}
                    </CustomCollapse>
                    <CustomCollapse 
                    header='Asset'
                    key={2}
                    >
                        
                    </CustomCollapse>
                </div>
            </Display>
            <ConfirmModal
            open={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            rOrl={false}
            title='Yakin ingin menghapus?'
            />
        </>
    )
}

export default Dashboard